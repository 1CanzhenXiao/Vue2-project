import mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        mock.mock({
            倾城之恋: mock.Random.float(100, 8000, 0, 0),
            情人: mock.Random.float(100, 8000, 0, 0),
            挪威的森林: mock.Random.float(100, 8000, 0, 0),
            虹: mock.Random.float(100, 8000, 0, 0),
            围城: mock.Random.float(100, 8000, 0, 0),
            小王子: mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '倾城之恋',
            value: 39.5
          },
          {
            name: '情人',
            value: 59.7
          },
          {
            name: '挪威的森林',
            value: 45.2
          },
          {
            name: '虹',
            value: 79
          },
          {
            name: '围城',
            value: 57
          },
          {
            name: '小王子',
            value: 42
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          {
            name: '倾城之恋',
            writer: '张爱玲',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: '情人',
            writer: '玛格丽特杜拉斯',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '挪威的森林',
            writer: '村上春树',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '虹',
            writer: '劳伦斯',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '围城',
            writer: '钱钟书',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '小王子',
            writer: '德克旭贝里',
            press: '人民出版社',
            date: '2000-1-1',
            situation: '可看',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ]
      }
    }
  }
}