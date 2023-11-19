'use client'

import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";
import useOrders from "@/store/orders";
import { OrdersType } from "@/types/orders";

interface ChartData {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    borderColor: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    const { data: orderData, getOrders } = useOrders();
  
    const orderStatusCount = useMemo(() => {
      if (!orderData || orderData.length === 0) return {};
  
      return orderData.reduce((acc: Record<string, number>, order: OrdersType) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
    }, [orderData]);
  
    const xValues = useMemo(() => Object.keys(orderStatusCount), [orderStatusCount]);
    const yValues = useMemo(() => Object.values(orderStatusCount), [orderStatusCount]);
  
    useEffect(() => {
      getOrders();
    }, [getOrders]);
  
    useEffect(() => {
      const ctx = chartRef.current?.getContext("2d");
  
      if (ctx && chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [
              {
                backgroundColor: ["rgba(0,0,255,1.0)", "rgba(0,255,0,1.0)", "rgba(255,0,0,1.0)"],
                borderColor: "rgba(0,0,0,0.1)",
                data: yValues,
              },
            ],
          },
          options: {
            scales: {
              y: { beginAtZero: true },
            },
          },
        });
      }
    }, [xValues, yValues]);

  return <canvas ref={chartRef} />;
};

export default ChartOne;