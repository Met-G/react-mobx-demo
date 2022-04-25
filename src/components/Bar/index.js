import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

function echartsInit(node, xData, sData, title) {
  const myChart = echarts.init(node);

  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      { name: 'Sales', type: 'bar', data: sData }
    ]
  })
}

export default function Bar({ style, xData, sData, title }) {
  const nodeRef = useRef(null);
  useEffect(() => {
    echartsInit(nodeRef.current, xData, sData, title)
  }, [xData, sData, title])

  return (
    <div ref={nodeRef} style={style}></div>
  )
};
