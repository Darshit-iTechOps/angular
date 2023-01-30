using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testproject.api.Models;

[Table("manager")]
public partial class Manager
{
    [Key]
    public int ManagerId { get; set; }
    [ForeignKey(nameof(Employee))]
    public int EmpId { get; set; }
    public virtual Employee? Employee { get; set; }
} 
