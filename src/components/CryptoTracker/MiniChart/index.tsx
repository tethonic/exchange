import { useEffect, useRef } from 'react';
import { createChart, ColorType, LineStyle, LineSeries } from 'lightweight-charts';

interface MiniChartProps {
  symbol: string;
}

export const MiniChart = ({ symbol }: MiniChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: 160,
      height: 60,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      handleScroll: false,
      handleScale: false,
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#26a69a',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`)
      .then(res => res.json())
      .then(data => {
        const chartData = data.map((d: [number, string, string, string, string, string, string, string, string, string, string, string]) => ({
          time: d[0] / 1000,
          value: parseFloat(d[4])
        }));
        
        if (lineSeries) {
          lineSeries.setData(chartData);
          chart.timeScale().fitContent();
        }
      });

    return () => chart.remove();
  }, [symbol]);

  return <div ref={chartRef} />;
};
