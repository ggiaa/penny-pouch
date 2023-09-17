import useStore from "../../store/store";
import EChartsReact from "echarts-for-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

function CurrentWeekStatistic() {
  const modeStore = useStore();
  const transactions = useStore((state) => state.currentWeekTransactions);

  useEffect(() => {
    modeStore.fetchCurrentWeekTransactions();
  }, []);

  const option = {
    tooltip: {},
    color: ["#4cabce", "#e5323e"],
    dataset: {
      source: [
        ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ["Income"].concat(transactions.income),
        ["Expense"].concat(transactions.expense),
      ],
    },
    legend: {},
    xAxis: {
      type: "category",
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        seriesLayoutBy: "row",
        emphasis: {
          itemStyle: {
            // color: "green",
          },
        },
      },
      {
        type: "bar",
        seriesLayoutBy: "row",
      },
    ],
  };
  return (
    <div className="h-full flex flex-col">
      <div>This Week Statistic</div>
      <div className="flex-1">
        <EChartsReact className="min-h-full" option={option} />
      </div>
    </div>
  );
}

export default CurrentWeekStatistic;
