import React, { useState, useEffect, useRef, ReactNode, Fragment } from 'react'
import * as d3 from 'd3'
import './styles.scss'
import useBarUtils from './useBarUtils'

export interface IBar {
    index: number
    x: number
    y: number
    height: number
    width: number
    value?: number
}
export interface IChartData {
    xValue: string
    yValue: number
  }
  export interface IBarProps{
  data: IChartData[], yLabel: ReactNode
  }
export const BarChart: React.FC<{ data: IChartData[], yLabel: ReactNode }> = ({ data, yLabel }) => {

    const { calculateScrollBars, calculateBars, calculateScrollSelector, chartAttr } = useBarUtils(data)
    const { svgWidth, svgHeight, svgMargin, svgScrollHeight, svgScrollMargin, padding, sliceWidth } = chartAttr

    const [bars, setBars] = useState<IBar[]>([])
    const [scrollBars, setScrollBars] = useState<IBar[]>([])
    const [sliceStart, setSliceStart] = useState(0)
    const [scrollSelectorX, setScrollSelectorX] = useState(svgScrollMargin.left)
    const [{ scrollSelectorWidth, scrollSelectorMinX, scrollSelectorMaxX, scrollBandWidth },
        setScrollSelector] = useState({
            scrollSelectorWidth: 0, scrollSelectorMinX: 0,
            scrollSelectorMaxX: 0, scrollBandWidth: 0
        })
    const yMaxValue: number = d3.max(data, (d: IChartData) => d.yValue) ?? 0

    const yScale = d3
        .scaleLinear()
        .domain([0, yMaxValue])
        .rangeRound([svgHeight - svgMargin.bottom - svgScrollHeight, svgMargin.top])

    const xScale = d3
        .scaleBand()
        .domain(data.map((d: IChartData) => d.xValue))
        .rangeRound([svgMargin.left, svgWidth - svgMargin.right])
        .padding(padding)

    const yScrollScale = d3
        .scaleLinear()
        .domain([0, yMaxValue])
        .rangeRound([svgHeight, svgHeight - svgScrollHeight + svgScrollMargin.top])

    const xAxis: any = d3.axisBottom(xScale)

    const yAxisTicks = yScale.ticks().filter(Number.isInteger)
    const yAxis: any = d3
        .axisLeft(yScale)
        .tickValues(yAxisTicks)
        .tickFormat(d3.format('d'))

    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        drawBarChart(0)
    }, [])

    useEffect(() => {
        const scrollBars = calculateScrollBars(xScale, yScrollScale)
        setScrollBars(scrollBars)
    }, [bars.length])

    useEffect(() => {
        if (scrollBars.length > 0) {
            const selector = calculateScrollSelector(scrollBars.length)
            setScrollSelector({ ...selector })
        }
    }, [scrollBars.length])

    useEffect(() => {
        if (scrollBandWidth > 0) {
            const drag: any = d3.drag().on("drag", scrollDrag)
            d3.select(scrollRef.current).call(drag)
        }
    }, [scrollBandWidth])

    const drawBarChart = (newSliceStart: number) => {
        if (newSliceStart <= 1) {
            newSliceStart = 0
            setSliceStart(newSliceStart)
        }
        const bars = calculateBars(newSliceStart, xScale, yScale)
        setBars(bars)
        d3.select(xAxisRef.current).call(xAxis)
        d3.select(yAxisRef.current).call(yAxis)
    }

    const scrollDrag = (event: { x: number }) => {

        let newX = scrollSelectorX + event.x

        if (newX > scrollSelectorMaxX) {
            newX = scrollSelectorMaxX
        }
        else if (newX < scrollSelectorMinX) {
            newX = scrollSelectorMinX
        }
        setScrollSelectorX(newX)

        let newSlice = newX - scrollSelectorMinX
        newSlice = Math.round(newSlice / scrollBandWidth)

        if (newSlice !== sliceStart) drawBarChart(newSlice)
    }

    return (
        <div className="chart">
            <svg
                preserveAspectRatio={"xMidYMid"}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
                {bars.map((d, i) => (
                    <Fragment key={i}
                    >
                        <rect
                            x={d.x}
                            y={d.y}
                            width={d.width}
                            height={d.height}
                            fill={"#007A86"}
                        />
                        {d?.value && d?.value > 0 &&
                            <text
                                className="text" textAnchor="middle" x={d.x + (d.width / 2)}
                                y={d.y + 20} fill={"#FFF"} style={{ fontSize: 16 }}>
                                {d.value}
                            </text>
                        }
                    </Fragment>
                ))}

                {(data.length > sliceWidth) &&
                    <>
                        {
                            scrollBars.map((d, i) => (
                                <rect
                                    key={i}
                                    x={d.x}
                                    y={d.y}
                                    width={d.width}
                                    height={d.height}
                                    fill={"#cccccc"}
                                />
                            ))
                        }

                        < rect
                            ref={scrollRef}
                            className="scroll-selector"
                            x={scrollSelectorX}
                            y={svgHeight - svgScrollHeight}
                            width={scrollSelectorWidth}
                            height={svgScrollHeight}
                        />
                    </>}
                <g>
                    <g
                        ref={xAxisRef}
                        transform={`translate(0, ${svgHeight -
                            svgMargin.bottom -
                            svgScrollHeight})`}
                        className="axis"
                    />
                    <g
                        ref={yAxisRef}
                        transform={`translate(${svgMargin.left}, 0)`}
                        className="axis"
                    >
                        <text
                            x={-((svgHeight / 2) - (svgMargin.top))}
                            y={-45}
                            fill="#A7A8AA"
                            textAnchor="middle"
                            transform={'rotate(-90)'}
                            style={{ fontSize: 18 }}
                        >
                            {yLabel}
                        </text>
                    </g>
                </g>
            </svg >
        </div >
    )

}




