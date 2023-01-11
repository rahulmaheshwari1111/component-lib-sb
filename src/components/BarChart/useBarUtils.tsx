

export interface IChartData {
    xValue: string
    yValue: number
  }
const useBarUtils = (data: IChartData[]) => {

    const chartAttr = {
        svgWidth: 1200,
        svgHeight: 500,
        svgMargin: { top: 50, right: 50, bottom: 70, left: 60 },
        svgScrollHeight: 60,
        svgScrollMargin: { top: 50, right: 50, left: 60, bottom: 0 },
        padding: 0.2,
        sliceWidth: 10,
    }
    const { svgWidth, svgHeight, svgMargin, svgScrollHeight, svgScrollMargin, sliceWidth } = chartAttr

    const calculateScrollBars = (xScale: any, yScale: any) => {

        const scrollBars = data.map((d, index) => {
            const scrollX = xScale(d.xValue) ?? 0
            const scrollY = yScale(d.yValue)
            const scrollWidth = xScale.bandwidth()
            const scrollHeight = svgHeight - scrollY

            return {
                index,
                x: scrollX,
                y: scrollY,
                width: scrollWidth,
                height: scrollHeight,
            }
        })

        return scrollBars
    }

    const calculateBars = (newSliceStart: number, xScale: any, yScale: any) => {

        const newData = data.slice(newSliceStart, newSliceStart + sliceWidth)

        const xDomain = newData.map(d => d.xValue)
        xScale.domain(xDomain)

        const bars = newData
            .map((d, index) => {
                const x = xScale(d.xValue) ?? 0
                const y = yScale(d.yValue)
                const width = xScale.bandwidth()
                const height = svgHeight - svgMargin.bottom - svgScrollHeight - y

                return {
                    index,
                    x,
                    y,
                    height,
                    width,
                    value: d.yValue
                }
            })

        return bars
    }

    const calculateScrollSelector = (scrollBarsLength: number) => {

        const scaleWidth = svgWidth - svgScrollMargin.right - svgScrollMargin.left
        const scrollSelectorWidth = Math.round((sliceWidth / scrollBarsLength) * scaleWidth)
        const scrollSelectorMinX = svgScrollMargin.left
        const scrollSelectorMaxX = svgWidth - svgScrollMargin.right - scrollSelectorWidth
        const scrollBandWidth = Math.round(scaleWidth / scrollBarsLength)

        return {
            scrollSelectorWidth,
            scrollSelectorMinX,
            scrollSelectorMaxX,
            scrollBandWidth
        }
    }

    return { chartAttr, calculateScrollBars, calculateBars, calculateScrollSelector }
}

export default useBarUtils