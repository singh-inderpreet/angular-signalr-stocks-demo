using System.Collections.Generic;

namespace Stock_Server.Models
{
    public class StockModel
    {
        public string name { get; set; }
        public string date { get; set; }
        public double price { get; set; }
        public string currency { get; set; }
        public double change { get; set; }
        public double changePercentage { get; set; }
        public string lastTradeTime { get; set; }
        public long volume { get; set; }

        public StockModel()
        {
            
        }
    }
}
