using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Tls.Crypto.Impl.BC;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<ShowTime> ShowTimes { get; set; }
        public DbSet<BookingOrder> BookingOrders { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<Combo> Combos { get; set; }
        public DbSet<BookingCombo> BookingCombos { get; set; }
        public DbSet<Payment> Payments { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BookingOrder>()
                    .HasMany(o => o.BookingDetails)
                    .WithOne(d => d.BookingOrder)
                    .HasForeignKey(d => d.BookingOrderId)
                    .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<BookingDetail>()
                .HasOne(d => d.ShowTime)
                .WithMany()
                .HasForeignKey(d => d.ShowTimeId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<BookingDetail>()
                .HasOne(d => d.Seat)
                .WithMany() 
                .HasForeignKey(d => d.SeatId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Seat>()
            .HasOne(s => s.Room)
            .WithMany(r => r.Seats)
            .HasForeignKey(s => s.RoomId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<BookingCombo>()
                   .HasOne(s => s.BookingOrder)
                   .WithMany(o=>o.BookingCombos)
                   .HasForeignKey(bc => bc.BookingOrderId)
                   .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<BookingCombo>()
                   .HasOne(s => s.Combo)
                   .WithMany()
                   .HasForeignKey(s => s.ComboId)
                   .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<BookingOrder>()
                   .HasOne(b => b.Payment)
                   .WithOne(p => p.BookingOrder)
                   .HasForeignKey<Payment>(p => p.BookingOrderId)
                   .OnDelete(DeleteBehavior.Cascade );
            // ShowTime - Room
            builder.Entity<ShowTime>()
                .HasOne(s => s.Room)
                .WithMany()
                .HasForeignKey(s => s.RoomId)
                .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<ShowTime>()
            .HasOne(s => s.Movie)
            .WithMany()
            .HasForeignKey(s => s.MovieId)
            .OnDelete(DeleteBehavior.NoAction);
            builder.Entity<Seat>().HasIndex(s => new { s.RoomId, s.SeatCode }).IsUnique();
            builder.Entity<Seat>().HasIndex(s => new { s.RoomId, s.RowIndex, s.ColIndex });
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="User",
                    NormalizedName="USER"
                },
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole{
                    Name="Staff",
                    NormalizedName="STAFF"
                }
            };
        }
    }
}