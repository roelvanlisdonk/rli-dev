using System.IO;
using System.Threading.Tasks;
using MediaToolkit;
using MediaToolkit.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VideoLibrary;

namespace YoutubeToMp3.Api.Youtube
{
    [ApiController]
    [Route("[controller]")]
    public class YoutubeController : ControllerBase
    {
        private readonly ILogger<YoutubeController> _logger;
        private readonly MessageHub _messageHub;
        

        public YoutubeController(ILogger<YoutubeController> logger, MessageHub messagHub)
        {
            _logger = logger;
            _messageHub = messagHub;
        }

        [HttpPost("DownloadAsMp3")]
        public async Task DownloadAsMp3(DownloadFromYoutubeRequest request)
        {
            await _messageHub.SendMessage("SomeUser", "DownloadFromYoutube started");

            var source = @"C:\Downloads";
            var youtube = YouTube.Default;

            await _messageHub.SendMessage("SomeUser", "Download the video from youtube");
            var vid = youtube.GetVideo(request.YoutubeUrl);

            await _messageHub.SendMessage("SomeUser", "Save the video to the filesystem");
            System.IO.File.WriteAllBytes(Path.Combine(source, vid.FullName), vid.GetBytes());

            var inputFile = new MediaFile { Filename = source + vid.FullName };
            var outputFile = new MediaFile { Filename = $"{source + vid.FullName}.mp3" };

            await _messageHub.SendMessage("SomeUser", "Convert video to mp3");
            using (var engine = new Engine())
            {
                engine.GetMetadata(inputFile);

                engine.Convert(inputFile, outputFile);
            }

            await _messageHub.SendMessage("SomeUser", "DownloadFromYoutube completed");
        }
    }
}