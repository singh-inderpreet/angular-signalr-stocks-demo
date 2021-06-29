using Microsoft.AspNetCore.SignalR;
using Stock_Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Stock_Server.HubConfig
{
    public class StockHub : Hub
    {
        public async Task BroadcastChartData(List<StockModel> data) => await Clients.All.SendAsync("broadcastchartdata", data);
    }
}
