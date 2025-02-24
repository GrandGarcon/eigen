import { Aggregations } from "lib/Components/ArtworkFilter/ArtworkFilterHelpers"
import {
  SearchCriteria,
  SearchCriteriaAttributes,
} from "lib/Components/ArtworkFilter/SavedSearch/types"
import { extractPillFromAggregation, extractPills, extractSizeLabel } from "./pillExtractors"

describe("extractPillFromAggregation", () => {
  it("returns pills", () => {
    const result = extractPillFromAggregation(
      SearchCriteria.materialsTerms,
      ["acrylic", "canvas"],
      aggregations
    )

    const pills = [
      { label: "Acrylic", value: "acrylic", paramName: SearchCriteria.materialsTerms },
      { label: "Canvas", value: "canvas", paramName: SearchCriteria.materialsTerms },
    ]

    expect(result).toEqual(pills)
  })

  it("returns undefined for unknown param values", () => {
    const result = extractPillFromAggregation(
      SearchCriteria.materialsTerms,
      ["acrylic", "canvas", "unknown-value"],
      aggregations
    )

    const pills = [
      { label: "Acrylic", value: "acrylic", paramName: SearchCriteria.materialsTerms },
      { label: "Canvas", value: "canvas", paramName: SearchCriteria.materialsTerms },
      undefined,
    ]

    expect(result).toEqual(pills)
  })

  it("returns empty array when couldn't get aggregation by param name", () => {
    const result = extractPillFromAggregation(
      SearchCriteria.materialsTerms,
      ["acrylic", "canvas", "unknown-value"],
      []
    )

    expect(result).toEqual([])
  })
})

describe("extractSizeLabel", () => {
  it("returns correcly label when full range is specified", () => {
    expect(extractSizeLabel("w", "5-10")).toBe("w: 5-10 in")
  })

  it("returns correcly label when only min value is specified", () => {
    expect(extractSizeLabel("w", "5-*")).toBe("w: from 5 in")
  })

  it("returns correcly label when only max value is specified", () => {
    expect(extractSizeLabel("w", "*-10")).toBe("w: to 10 in")
  })

  it("returns specified prefix", () => {
    expect(extractSizeLabel("h", "5-10")).toBe("h: 5-10 in")
  })
})

describe("extractPills", () => {
  it("should correctly extract pills", () => {
    const attributes: SearchCriteriaAttributes = {
      materialsTerms: ["acrylic", "canvas"],
      priceRange: "5000-10000",
      attributionClass: ["limited edition", "open edition"],
      offerable: true,
      width: "5-10",
      height: "15-*",
      colors: ["unknown-color"],
    }

    const result = extractPills(attributes, aggregations)

    const pills = [
      {
        label: "Acrylic",
        paramName: SearchCriteria.materialsTerms,
        value: "acrylic",
      },
      {
        label: "Canvas",
        paramName: SearchCriteria.materialsTerms,
        value: "canvas",
      },
      {
        label: "$5,000–10,000",
        value: "5000-10000",
        paramName: SearchCriteria.priceRange,
      },
      {
        paramName: SearchCriteria.attributionClass,
        label: "Limited Edition",
        value: "limited edition",
      },
      {
        paramName: SearchCriteria.attributionClass,
        label: "Open Edition",
        value: "open edition",
      },
      {
        label: "Make Offer",
        value: true,
        paramName: SearchCriteria.offerable,
      },
      {
        label: "w: 5-10 in",
        value: "5-10",
        paramName: SearchCriteria.width,
      },
      {
        label: "h: from 15 in",
        value: "15-*",
        paramName: SearchCriteria.height,
      },
    ]

    expect(result).toEqual(pills)
  })

  it("should correctly extract ways to buy pills", () => {
    const attributes: SearchCriteriaAttributes = {
      offerable: true,
      atAuction: true,
    }
    const result = extractPills(attributes, aggregations)

    const pills = [
      {
        label: "Make Offer",
        value: true,
        paramName: SearchCriteria.offerable,
      },
      {
        label: "Bid",
        value: true,
        paramName: SearchCriteria.atAuction,
      },
    ]

    expect(result).toEqual(pills)
  })

  it("should correctly extract size pills", () => {
    const attributes: SearchCriteriaAttributes = {
      sizes: ["SMALL", "LARGE"],
    }
    const result = extractPills(attributes, aggregations)

    expect(result).toEqual([
      {
        label: "Small (under 16in)",
        paramName: SearchCriteria.sizes,
        value: "SMALL",
      },
      {
        label: "Large (over 40in)",
        paramName: SearchCriteria.sizes,
        value: "LARGE",
      },
    ])
  })

  it("should correctly extract time period pills", () => {
    const attributes: SearchCriteriaAttributes = {
      majorPeriods: ["2020", "2010"],
    }
    const result = extractPills(attributes, aggregations)

    expect(result).toEqual([
      {
        label: "2020–Today",
        paramName: SearchCriteria.majorPeriods,
        value: "2020",
      },
      {
        label: "2010–2019",
        paramName: SearchCriteria.majorPeriods,
        value: "2010",
      },
    ])
  })

  it("should correctly extract color pills", () => {
    const attributes: SearchCriteriaAttributes = {
      colors: ["pink", "orange", "darkorange"],
    }
    const result = extractPills(attributes, aggregations)

    expect(result).toEqual([
      {
        label: "Pink",
        paramName: SearchCriteria.colors,
        value: "pink",
      },
      {
        label: "Orange",
        paramName: SearchCriteria.colors,
        value: "orange",
      },
      {
        label: "Dark Orange",
        paramName: SearchCriteria.colors,
        value: "darkorange",
      },
    ])
  })

  it("should correctly extract attribution pills", () => {
    const attributes: SearchCriteriaAttributes = {
      attributionClass: ["unique", "unknown edition"],
    }
    const result = extractPills(attributes, aggregations)

    expect(result).toEqual([
      {
        label: "Unique",
        paramName: SearchCriteria.attributionClass,
        value: "unique",
      },
      {
        label: "Unknown Edition",
        paramName: SearchCriteria.attributionClass,
        value: "unknown edition",
      },
    ])
  })

  it("should correctly extract custom price range pill", () => {
    const attributes: SearchCriteriaAttributes = {
      priceRange: "1000-1500",
    }
    const result = extractPills(attributes, aggregations)

    expect(result).toEqual([
      {
        label: "$1,000–1,500",
        paramName: SearchCriteria.priceRange,
        value: "1000-1500",
      },
    ])
  })
})

const aggregations: Aggregations = [
  {
    slice: "MATERIALS_TERMS",
    counts: [
      {
        count: 44,
        name: "Acrylic",
        value: "acrylic",
      },
      {
        count: 30,
        name: "Canvas",
        value: "canvas",
      },
      {
        count: 26,
        name: "Metal",
        value: "metal",
      },
    ],
  },
]
