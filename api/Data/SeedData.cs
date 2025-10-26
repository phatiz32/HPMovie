using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public static class SeedData
    {
        public static async Task SeedAdminAsync(UserManager<AppUser> userManager)
        {
            var email = "admin@example.com";
            var password = "Admin@123";
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                var newAdmin = new AppUser
                {
                    UserName = email,
                    Email = email,
                    FullName = "Administrator",
                    PhoneNumber = "0123456789"

                };
                var result = await userManager.CreateAsync(newAdmin, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Admin");
                }
            }
        }
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "User", "Staff" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}