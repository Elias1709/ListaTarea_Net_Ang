using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entidades
{
    public class TodoItem : IValidatableObject

    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is require")]
        [StringLength(40, MinimumLength = 1, ErrorMessage = "Title should not have more than 40 characters")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is require")]
        [StringLength(80, MinimumLength = 1, ErrorMessage = "Description should not have more than 80 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "MaxCompletionDate is required")]
        public DateTime MaxCompletionDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (MaxCompletionDate < DateTime.Today)
            {
                yield return new ValidationResult(
                    "MaxCompletionDate must be greater than or equal to today",
                    new[] { nameof(MaxCompletionDate) }
                );
            }
        }


    }
}
