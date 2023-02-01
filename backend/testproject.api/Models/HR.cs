using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testproject.api.Models;

[Table("hr")]
public class HR
{
  [Key]
  public int HRId { get; set; }
  [ForeignKey(nameof(Employee))]
  public int EmpId { get; set; }
  public virtual Employee? Employee { get; set; }

  public HR() { }
  public HR(int hrId, int empId)
  {
    HRId = hrId;
    EmpId = empId;
  }
}
