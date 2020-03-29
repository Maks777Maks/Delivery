using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Delivery.Migrations
{
    public partial class AddModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "tblUserProfile",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "tblAdminProfile",
                columns: table => new
                {
                    FirstName = table.Column<string>(maxLength: 100, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 100, nullable: false),
                    LastName = table.Column<string>(maxLength: 100, nullable: false),
                    Photo = table.Column<string>(maxLength: 150, nullable: false),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblAdminProfile", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblAdminProfile_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblExtras",
                columns: table => new
                {
                    ExtraId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    Image = table.Column<string>(maxLength: 150, nullable: true),
                    Measuring = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblExtras", x => x.ExtraId);
                });

            migrationBuilder.CreateTable(
                name: "tblOrdersStatuses",
                columns: table => new
                {
                    StatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StatusName = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOrdersStatuses", x => x.StatusId);
                });

            migrationBuilder.CreateTable(
                name: "tblTypesOfCuisines",
                columns: table => new
                {
                    TypeOfCuisineId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TypeOfCuisineName = table.Column<string>(maxLength: 200, nullable: false),
                    Image = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTypesOfCuisines", x => x.TypeOfCuisineId);
                });

            migrationBuilder.CreateTable(
                name: "tblTypesOfDishes",
                columns: table => new
                {
                    TypeOfDishId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TypeOfDishName = table.Column<string>(maxLength: 150, nullable: false),
                    Image = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTypesOfDishes", x => x.TypeOfDishId);
                });

            migrationBuilder.CreateTable(
                name: "tblUsersAccesses",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DateBlock = table.Column<DateTime>(nullable: false),
                    Reason = table.Column<string>(maxLength: 500, nullable: false),
                    IsUnblock = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUsersAccesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblUsersAccesses_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblOrders",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrderInvoice = table.Column<string>(maxLength: 100, nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    DbUserId = table.Column<string>(nullable: true),
                    DateOfCreate = table.Column<DateTime>(nullable: false),
                    DateOfDelivery = table.Column<DateTime>(nullable: false),
                    OrderStatusId = table.Column<string>(nullable: true),
                    OrderStatusStatusId = table.Column<int>(nullable: true),
                    TotalPrice = table.Column<decimal>(nullable: false),
                    Address = table.Column<string>(maxLength: 200, nullable: false),
                    CustomerWishes = table.Column<string>(maxLength: 500, nullable: true),
                    DateReceived = table.Column<DateTime>(nullable: false),
                    DateCancel = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOrders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_tblOrders_AspNetUsers_DbUserId",
                        column: x => x.DbUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tblOrders_tblOrdersStatuses_OrderStatusStatusId",
                        column: x => x.OrderStatusStatusId,
                        principalTable: "tblOrdersStatuses",
                        principalColumn: "StatusId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tblDishes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Ingredients = table.Column<string>(maxLength: 500, nullable: false),
                    Description = table.Column<string>(maxLength: 1000, nullable: false),
                    Weight = table.Column<double>(nullable: false),
                    Image = table.Column<string>(maxLength: 200, nullable: false),
                    IsVegetarian = table.Column<bool>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    IsAvailable = table.Column<bool>(nullable: false),
                    TypeOfCuisineId = table.Column<int>(nullable: false),
                    TypeOfDishId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblDishes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblDishes_tblTypesOfCuisines_TypeOfCuisineId",
                        column: x => x.TypeOfCuisineId,
                        principalTable: "tblTypesOfCuisines",
                        principalColumn: "TypeOfCuisineId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblDishes_tblTypesOfDishes_TypeOfDishId",
                        column: x => x.TypeOfDishId,
                        principalTable: "tblTypesOfDishes",
                        principalColumn: "TypeOfDishId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblExtrasInOrder",
                columns: table => new
                {
                    ExtraInOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrderId = table.Column<int>(nullable: false),
                    ExtraId = table.Column<int>(nullable: false),
                    Amount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblExtrasInOrder", x => x.ExtraInOrderId);
                    table.ForeignKey(
                        name: "FK_tblExtrasInOrder_tblExtras_ExtraId",
                        column: x => x.ExtraId,
                        principalTable: "tblExtras",
                        principalColumn: "ExtraId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblExtrasInOrder_tblOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "tblOrders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblDishesInOrder",
                columns: table => new
                {
                    DishesInOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrderId = table.Column<int>(nullable: false),
                    DishId = table.Column<int>(nullable: false),
                    Amount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblDishesInOrder", x => x.DishesInOrderId);
                    table.ForeignKey(
                        name: "FK_tblDishesInOrder_tblDishes_DishId",
                        column: x => x.DishId,
                        principalTable: "tblDishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblDishesInOrder_tblOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "tblOrders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblDishes_TypeOfCuisineId",
                table: "tblDishes",
                column: "TypeOfCuisineId");

            migrationBuilder.CreateIndex(
                name: "IX_tblDishes_TypeOfDishId",
                table: "tblDishes",
                column: "TypeOfDishId");

            migrationBuilder.CreateIndex(
                name: "IX_tblDishesInOrder_DishId",
                table: "tblDishesInOrder",
                column: "DishId");

            migrationBuilder.CreateIndex(
                name: "IX_tblDishesInOrder_OrderId",
                table: "tblDishesInOrder",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_tblExtrasInOrder_ExtraId",
                table: "tblExtrasInOrder",
                column: "ExtraId");

            migrationBuilder.CreateIndex(
                name: "IX_tblExtrasInOrder_OrderId",
                table: "tblExtrasInOrder",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_DbUserId",
                table: "tblOrders",
                column: "DbUserId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_OrderStatusStatusId",
                table: "tblOrders",
                column: "OrderStatusStatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblAdminProfile");

            migrationBuilder.DropTable(
                name: "tblDishesInOrder");

            migrationBuilder.DropTable(
                name: "tblExtrasInOrder");

            migrationBuilder.DropTable(
                name: "tblUsersAccesses");

            migrationBuilder.DropTable(
                name: "tblDishes");

            migrationBuilder.DropTable(
                name: "tblExtras");

            migrationBuilder.DropTable(
                name: "tblOrders");

            migrationBuilder.DropTable(
                name: "tblTypesOfCuisines");

            migrationBuilder.DropTable(
                name: "tblTypesOfDishes");

            migrationBuilder.DropTable(
                name: "tblOrdersStatuses");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "tblUserProfile");
        }
    }
}
