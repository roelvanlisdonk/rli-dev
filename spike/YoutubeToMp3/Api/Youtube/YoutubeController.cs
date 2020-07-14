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
            string mp4FilePath = Path.Combine(source, vid.FullName);
            System.IO.File.WriteAllBytes(mp4FilePath, vid.GetBytes());

            await _messageHub.SendMessage("SomeUser", "Convert video to mp3");
            using (var engine = new Engine())
            {
                var inputFile = new MediaFile { Filename = mp4FilePath };
                engine.GetMetadata(inputFile);

                var outputFile = new MediaFile { Filename = $"{mp4FilePath}.mp3" };
                engine.Convert(inputFile, outputFile);
            }

            await _messageHub.SendMessage("SomeUser", "DownloadFromYoutube completed");
        }
    }
}