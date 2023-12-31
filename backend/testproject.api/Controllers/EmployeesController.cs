using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using testproject.api.Models;
using testproject.api.Services;
using testproject.models.Departments;
using testproject.models.Employees;
using testproject.models.Roles;

namespace testproject.api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
  private readonly IEmployeeService _employeeService;
  private readonly IManagerService _managerService;
  private readonly IHRService _hrService;
  public EmployeesController(IEmployeeService employeeService, IManagerService managerService, IHRService hrService)
  {
    _employeeService = employeeService;
    _managerService = managerService;
    _hrService = hrService;
  }

  [HttpGet]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult GetAllEmployee()
  {
    List<Employee> employees = _employeeService.GetAllEmployees();
    var response = EmpResponse(employees);
    return Ok(response);
  }

  [HttpGet("{id:int}")]
  [Authorize(Roles = "Employee, Manager, HR")]
  public IActionResult GetSingleEmployee(int id)
  {
    Employee employees = _employeeService.GetEmployee(id);
    var response = EmpResponse(employees);
    return Ok(response);
  }

  [HttpGet("managers")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetManagers()
  {
    List<Manager> managers = _managerService.GetAllManagers();
    return Ok(managers);
  }

  [HttpGet("managers/{id:int}")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetSingleManager(int id)
  {
    var managers = _managerService.GetSingleManager(id);
    var response =
    new EmployeePartialResponse(
      managers.EmpId,
      managers.Employee.FirstName,
      managers.Employee.LastName,
      managers.Employee.TelNo,
      managers.Employee.Email,
      new RoleResponse(
        managers.Employee.Role.RoleID,
        managers.Employee.Role.Name
        ),
      managers.ManagerId,
      managers.Employee.DeptId,
      managers.Employee.Status
      );
    return Ok(response);
  }

  [HttpGet("hr")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetHrs()
  {
    List<HR> hrs = _hrService.GetAllHRs();
    return Ok(hrs);
  }

  [HttpGet("hr/{id:int}")]
  [Authorize(Roles = "Managers, HR")]
  public IActionResult GetSingleHr(int id)
  {
    var hr = _hrService.GetSingleHR(id);
    var response =
    new EmployeePartialResponse(
      hr.EmpId,
      hr.Employee.FirstName,
      hr.Employee.LastName,
      hr.Employee.TelNo,
      hr.Employee.Email,
      new RoleResponse(
        hr.Employee.Role.RoleID,
        hr.Employee.Role.Name
        ),
      hr.Employee.ManagerId,
      hr.Employee.DeptId,
      hr.Employee.Status
      );
    return Ok(response);
  }

  [HttpPost("{id:int?}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult CreateEditEmployee(int id, CreateEditEmployeeRequest request)
  {
    var employee = new Employee();
    if (id != 0)
      employee = UpdateEmployee(id, request);
    else
      employee = CreateEmployee(request);

    _employeeService.CreateEditEmployee(id, employee);
    var response = _employeeService.GetEmployee(employee.EmpId);
    if (id == 0 && (response.RoleID == 2 || response.RoleID == 3))
      _employeeService.AssignAuto(response.EmpId, response.RoleID);

    return CreatedAtAction(
        nameof(GetSingleEmployee),
        routeValues: new { id = response?.EmpId },
        response
    );
  }

  [HttpPut("{id:int}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult UpdateEmployeeStatus(int id)
  {
    var employee = _employeeService.GetEmployee(id);
    employee.Status = !employee.Status;
    _employeeService.UpdateEmployeeStatus(employee);
    return Ok(employee);
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Manager, HR")]
  public IActionResult DeleteEmployee(int id)
  {
    _employeeService.DeleteEmployee(id);
    return Ok();
  }

  [NonAction]
  private static Employee CreateEmployee(CreateEditEmployeeRequest request)
  {
    return new Employee
    {
      FirstName = request.FirstName,
      LastName = request.LastName,
      Email = request.Email,
      TelNo = request.TelNo,
      RoleID = request.RoleID,
      Password = request.Password == "" ? "myPass123" : request.Password,
      ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
      DeptId = request.DeptId == 0 ? null : request.DeptId,
      Status = request.Status
    };
  }
  [NonAction]
  private static Employee UpdateEmployee(int id, CreateEditEmployeeRequest request) =>
  new Employee
  {
    EmpId = id,
    FirstName = request.FirstName,
    LastName = request.LastName,
    Email = request.Email,
    TelNo = request.TelNo,
    RoleID = request.RoleID,
    Password = request.Password,
    ManagerId = request.ManagerId == 0 ? null : request.ManagerId,
    DeptId = request.DeptId == 0 ? null : request.DeptId,
    Status = request.Status
  };


  [NonAction]
  private EmployeeFullResponse EmpResponse(Employee employee)
  {
    var manager = new Manager();
    if (employee.ManagerId != null)
      manager = _managerService.GetSingleManager((int)employee.ManagerId);

    return new EmployeeFullResponse(
        employee.EmpId,
        employee.FirstName,
        employee.LastName,
        employee.TelNo,
        employee.Email,
        employee.Password,
        new RoleResponse(
          employee.Role.RoleID,
          employee.Role.Name
          ),
        new ManagerFullResponse(
          manager?.ManagerId ?? 0,
          manager?.Employee?.FirstName ?? "",
          manager?.Employee?.LastName ?? "",
          manager?.Employee?.Email ?? "",
          manager?.Employee?.TelNo ?? "",
          manager?.Employee?.Status ?? false
          ),
        new DepartmentFullResponse(
          employee.Department?.DeptId ?? 0,
          employee.Department?.Name ?? "",
          employee.Department?.ManagerId ?? 0,
          employee.Department?.Status ?? false
          ),
        employee.Status
      );
  }
    

  [NonAction]
  private List<EmployeeFullResponse> EmpResponse(List<Employee> employees)
  {
    var list = new List<EmployeeFullResponse>();
    foreach (var employee in employees)
    {
      var manager = new Manager();
      if (employee.ManagerId != null)
         manager = _managerService.GetSingleManager((int)employee.ManagerId);

      list.Add(new EmployeeFullResponse(
        employee.EmpId,
        employee.FirstName,
        employee.LastName,
        employee.TelNo,
        employee.Email,
        employee.Password,
        new RoleResponse(
          employee.Role.RoleID,
          employee.Role.Name
          ),
        new ManagerFullResponse(
          manager?.ManagerId ?? 0,
          manager?.Employee?.FirstName ?? "",
          manager?.Employee?.LastName ?? "",
          manager?.Employee?.Email ?? "",
          manager?.Employee?.TelNo ?? "",
          manager?.Employee?.Status ?? false
          ),
        new DepartmentFullResponse(
          employee.Department?.DeptId ?? 0,
          employee.Department?.Name ?? "",
          employee.Department?.ManagerId ?? 0,
          employee.Department?.Status ?? false
          ),
        employee.Status
      ));
    }
    return list;
  }
}
