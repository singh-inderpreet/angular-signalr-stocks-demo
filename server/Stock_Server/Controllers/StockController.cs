using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stock_Server.DataStorage;
using Stock_Server.HubConfig;
using Stock_Server.TimerFeatures;

namespace Stock_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private IHubContext<StockHub> _hub; 

        public StockController(IHubContext<StockHub> hub) 
        { 
            _hub = hub;
        }

        public IActionResult Get()
        { 
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferstocks", DataManager.GetData())); 
            
            return Ok(new { Message = "Request Completed" }); 
        }
    }
}