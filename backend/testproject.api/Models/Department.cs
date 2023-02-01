using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testproject.api.Models;

[Table("department")]
public partial class Department
{
  [Key]
  public int DeptId { get; set; }
  public string Name { get; set; }
  [ForeignKey(nameof(Manager))]
  public int? ManagerId { get; set; }
  public virtual Manager? Manager { get; set; }
  public bool Status { get; set; }
}
