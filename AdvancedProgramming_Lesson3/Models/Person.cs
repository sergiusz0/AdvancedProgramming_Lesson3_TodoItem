using System.ComponentModel.DataAnnotations;
namespace AdvancedProgramming_Lesson3.Models
{
    public class Person
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        public string Occupation { get; set; }
        [Required]
        public string MaritalStatus { get; set; }

    }
}
