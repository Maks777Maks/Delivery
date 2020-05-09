using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.Services;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Delivery.Controllers
{
    // [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly EFDbContext _context;
        private readonly IHostingEnvironment _env;
        private readonly IConfiguration _configuration;

        public SettingsController(UserManager<DbUser> userManager,
                            SignInManager<DbUser> signInManager,
                            EFDbContext context,
                            IHostingEnvironment env,
                            IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _env = env;
            _configuration = configuration;
        }

        [HttpPost("get-image")]
        public IActionResult GetImage([FromBody] IdUserVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }
            
            //var userId = User.Claims.ToList()[0].Value;
            //var user = _context.UserProfile.FirstOrDefault(u => u.Id == userId);
            
            var query = _context.UserProfile.AsQueryable();
            var user = query.FirstOrDefault(c => c.Id == model.Id);

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/250_";
            string imagePath = user.Photo != null ? path + user.Photo :
                    path + _configuration.GetValue<string>("DefaultImage");

            return Ok(imagePath);
        }

        [HttpPost("change-image")]
        [RequestSizeLimit(100 * 1024 * 1024)]
        public IActionResult ChangeImage([FromBody] ChangeImage model)
        {
            string image = null;
            //var userId = User.Claims.ToList()[0].Value;
            //var user = _context.UserProfile.FirstOrDefault(u => u.Id == userId);

            var query = _context.UserProfile.AsQueryable();
            var user = query.FirstOrDefault(c => c.Id == model.Id);

            if (user != null)
            {
                string imageName = user.Photo ?? Guid.NewGuid().ToString() + ".jpg";
                string pathSaveImages = InitStaticFiles
                    .CreateImageByFileName(_env, _configuration,
                    new string[] { "ImagesPath", "ImagesUserPath" },
                    imageName, model.Photo);

                if (pathSaveImages != null)
                {
                    image = imageName;
                    user.Photo = image;
                    _context.SaveChanges();
                }
                else
                {
                    image = user.Photo;
                }
            }

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/250_";
            string imagePath = image != null ? path + image :
                    path + _configuration.GetValue<string>("DefaultImage");

            return Ok(imagePath);
        }
    }
}
