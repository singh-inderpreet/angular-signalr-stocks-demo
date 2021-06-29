using Stock_Server.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace Stock_Server.DataStorage
{
    public static class DataManager
    {
        static public List<StockModel> appleData;
        static public List<StockModel> mstData;
        static public List<StockModel> googleData;
        static public List<StockModel> teslaData;
        public static List<StockModel> GetData()
        {
            // Get data from offline CSV files
            if (appleData == null)
            {
                var applePath = System.IO.Path.GetFullPath("mocks\\AAPL.csv");
                appleData = getDataFromCSV(applePath, "AAPL");
            }
            if (mstData == null)
            {
                var mstPath = System.IO.Path.GetFullPath("mocks\\MSFT.csv");
                mstData = getDataFromCSV(mstPath, "MSFT");
            }
            if (googleData == null)
            {
                var googlePath = System.IO.Path.GetFullPath("mocks\\GOOG.csv");
                googleData = getDataFromCSV(googlePath, "GOOG");
            }
            if (teslaData == null)
            {
                var teslaPath = System.IO.Path.GetFullPath("mocks\\TSLA.csv");
                teslaData = getDataFromCSV(teslaPath, "TSLA");
            }
            Random rnd = new Random();
            var randomNo = rnd.Next(0, appleData.Count -1);
            StockModel selectedAppleStock = appleData[randomNo];
            List<StockModel> stocks = isAllStockListedForDate(selectedAppleStock.date);
            while (stocks == null)
            {
                stocks = isAllStockListedForDate(selectedAppleStock.date);
            }
            stocks.Add(selectedAppleStock);
            return stocks;
        }
        public static List<StockModel> isAllStockListedForDate(string date)
        {
            StockModel mstStock = getStockForDate(date, mstData);
            StockModel googleStock = getStockForDate(date, googleData);
            StockModel teslaStock = getStockForDate(date, teslaData);
            if (mstData != null &&
                googleStock != null &&
                teslaStock != null)
            {
                List<StockModel> stocks = new List<StockModel>();
                stocks.Add(mstStock);
                stocks.Add(googleStock);
                stocks.Add(teslaStock);
                return stocks;
            }
            return null;
        }
        public static StockModel getStockForDate(string date, List<StockModel> data)
        {
            for (int i = 0; i < data.Count; i++)
            {
                if (data[i].date == date)
                {
                    return data[i];
                }
            }
            return null;
        }
        public static List<StockModel> getDataFromCSV(string path, string name) 
        {
            List<StockModel> data = new List<StockModel>();
            string csvData = File.ReadAllText(path);
            int index = 0;
            foreach (string row in csvData.Split('\n'))
            {
                if (index == 0)
                {
                    index++;
                    continue;
                }
                var stock = new StockModel();
                if (!string.IsNullOrEmpty(row))
                {
                    var currentRow = row.Split(',');
                    stock.name = name;
                    stock.date = currentRow[0];
                    stock.price = Math.Round(float.Parse(currentRow[1]), 2);
                    double change = stock.price - float.Parse(currentRow[4]);
                    stock.change = Math.Round(change, 2);
                    double changePercent = (stock.change / stock.price) * 100;
                    stock.changePercentage = Math.Round(changePercent, 2);
                    stock.volume = long.Parse(currentRow[6]);
                    stock.currency = "$";
                    data.Add(stock);
                }
            }
            return data;
        }
    }
}
