using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingCombos_BookingOrders_BookingOrderId",
                table: "BookingCombos");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingCombos_BookingOrders_BookingOrderId",
                table: "BookingCombos",
                column: "BookingOrderId",
                principalTable: "BookingOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookingCombos_BookingOrders_BookingOrderId",
                table: "BookingCombos");

            migrationBuilder.AddForeignKey(
                name: "FK_BookingCombos_BookingOrders_BookingOrderId",
                table: "BookingCombos",
                column: "BookingOrderId",
                principalTable: "BookingOrders",
                principalColumn: "Id");
        }
    }
}
