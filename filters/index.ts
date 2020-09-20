import { Component } from "react";
// 投资金额
Component.prototype.investMoneyFilters = (value) => {
    const amount = ["1-50万", "50-100万", "100-300万", "300-500万", "500-1000万", "1000-5000万", "5000万-一亿", "一亿以上"];
    return amount[value-1];
}
// 项目类型
Component.prototype.projectTypeFilters = (value) => {
    const amount = ['个人', '公司'];
    return amount[value-1];
}
// 投资意向项目阶段
Component.prototype.phaseFilters = (value) => {
    const amount = ['天使轮', 'A轮', 'B轮', 'C轮'];
    return amount[value-1];
}