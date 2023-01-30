using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace testproject.api.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.RoleID);
                });

            migrationBuilder.CreateTable(
                name: "department",
                columns: table => new
                {
                    DeptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department", x => x.DeptId);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TelNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerId = table.Column<int>(type: "int", nullable: true),
                    DeptId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.EmpId);
                    table.ForeignKey(
                        name: "FK_employee_department_DeptId",
                        column: x => x.DeptId,
                        principalTable: "department",
                        principalColumn: "DeptId");
                    table.ForeignKey(
                        name: "FK_employee_role_RoleID",
                        column: x => x.RoleID,
                        principalTable: "role",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "manager",
                columns: table => new
                {
                    ManagerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_manager", x => x.ManagerId);
                    table.ForeignKey(
                        name: "FK_manager_employee_EmpId",
                        column: x => x.EmpId,
                        principalTable: "employee",
                        principalColumn: "EmpId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "role",
                columns: new[] { "RoleID", "Name" },
                values: new object[] { 1, "Employee" });

            migrationBuilder.InsertData(
                table: "role",
                columns: new[] { "RoleID", "Name" },
                values: new object[] { 2, "Manager" });

            migrationBuilder.InsertData(
                table: "role",
                columns: new[] { "RoleID", "Name" },
                values: new object[] { 3, "HR" });

            migrationBuilder.CreateIndex(
                name: "IX_department_ManagerId",
                table: "department",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_employee_DeptId",
                table: "employee",
                column: "DeptId");

            migrationBuilder.CreateIndex(
                name: "IX_employee_ManagerId",
                table: "employee",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_employee_RoleID",
                table: "employee",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_manager_EmpId",
                table: "manager",
                column: "EmpId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_department_manager_ManagerId",
                table: "department",
                column: "ManagerId",
                principalTable: "manager",
                principalColumn: "ManagerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_employee_manager_ManagerId",
                table: "employee",
                column: "ManagerId",
                principalTable: "manager",
                principalColumn: "ManagerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_department_manager_ManagerId",
                table: "department");

            migrationBuilder.DropForeignKey(
                name: "FK_employee_manager_ManagerId",
                table: "employee");

            migrationBuilder.DropTable(
                name: "manager");

            migrationBuilder.DropTable(
                name: "employee");

            migrationBuilder.DropTable(
                name: "department");

            migrationBuilder.DropTable(
                name: "role");
        }
    }
}
