using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace YoutubeToMp3.Api.Youtube
{
    public class MessageHub: Hub
    {
        public IHubContext<MessageHub> _hubContext;

        public MessageHub(IHubContext<MessageHub> hubContext) { 
            _hubContext = hubContext; 
        }

        public async Task SendMessage(string user, string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
