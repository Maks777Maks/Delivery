using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.Services;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EFDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        public UserProfileController(EFDbContext context, UserManager<DbUser> userManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
        }
        [HttpGet("getuserprofile")]
        public IActionResult GetUserProfile()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }
            
            var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            var u = query.FirstOrDefault(c => c.Id == "04ee5f4c-fa0b-4fae-9f6b-b082ad0d41c1");
            var result =  new UserProfileInfoVM
            {
                Id = u.Id,
                Name = u.UserProfile != null ? u.UserProfile.FirstName : null,
                Surname = u.UserProfile != null ? u.UserProfile.LastName : null,
                Email = u.Email,
                Phone = u.PhoneNumber,
                BirthDate = u.UserProfile == null ? DateTime.Now : u.UserProfile.BirthDate
            };
            return Ok(result);
        }
    }
}