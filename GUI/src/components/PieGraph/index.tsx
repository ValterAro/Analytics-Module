import React, { useEffect, useRef, useState } from 'react'
import { PieChart, Cell, Pie, Tooltip, Legend } from 'recharts'
import { getColor } from '../../util/charts-utils'
import ChartToolTip from '../ChartToolTip'
import Track from '../Track'
import './PieGraph.scss'

type Props = {
  dataKey: string
  data: any
}

const PieGraph = ({ dataKey, data }: Props) => {
  const [width, setWidth] = useState<number>(10)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current?.clientWidth ?? 0)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={ref}>
      <Track>
        <PieChart
          width={width / 2}
          height={width / 2.8}
          data={data.chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <Pie
            data={data.chartData}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {(data?.chartData?.length > 0 ?? false) &&
              Object.keys(data.chartData[0]).map((k, i) => {
                return k === `${dataKey}` ? null : (
                  <Cell
                    key={k}
                    type="monotone"
                    stroke={getColor(data, k)}
                    fill={getColor(data, k)}
                  />
                )
              })}
          </Pie>
          <Tooltip content={<ChartToolTip />} />
        </PieChart>
        <Track
          direction="vertical"
          flex={20}
          align="left"
          isFlex={true}
          isMultiline={true}
        >
          {(data?.chartData?.length > 0 ?? false) && (data?.percentagesData == undefined) &&
            Object.keys(data.chartData[0]).map((k, i) => {
              return (
                <Track key={k}>
                  {k === `${dataKey}` ? null : (
                    <div
                      className="legend_circle"
                      style={{ backgroundColor: getColor(data, k) }}
                      key={k}
                    />
                  )}
                  {k === `${dataKey}` ? null : <label style={{ color: getColor(data, k) }}>{k}</label>}
                </Track>
              )
            })}
            {(data?.percentagesData != undefined) &&
             Object.keys(data.percentagesData).map((k, i) => {
               console.log(k);
                return (
                 <Track key={k}>
                   {k === `${dataKey}` ? null : (
                    <div
                      className="legend_circle"
                      style={{ backgroundColor: getColor(data, k) }}
                      key={k}
                    />
                  )}
                  {k === `${dataKey}` ? null : <label style={{ color: getColor(data, k), maxLines:1}}>{`${k}: ${data.percentagesData[k]} %`}</label>}
                </Track>
              )
            })}
        </Track>
      </Track>
    </div>
  )
}

export default PieGraph
