using Delivery.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.EFContext
{
    public class EFDbContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
    DbUserRole, IdentityUserLogin<string>,
    IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EFDbContext(DbContextOptions<EFDbContext> options) : base(options) { }

        public virtual DbSet<UserProfile> UserProfile { get; set; }
        public virtual DbSet<UserAccess> UsersAccesses { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<DishInOrder> DishesInOrder { get; set; }
        public virtual DbSet<Extra> Extras { get; set; }
        public virtual DbSet<ExtraInOrder> ExtrasInOrder { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderStatus> OrdersStatuses { get; set; }
        public virtual DbSet<TypeOfCuisine> TypesOfCuisines { get; set; }
        public virtual DbSet<TypeOfDish> TypesOfDishes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }
    }
}
