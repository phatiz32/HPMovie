using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Combo;
using api.Models;

namespace api.Mappers
{
    public static class ComboMapper
    {
        public static Combo ToCombo(this CreateComboDto dto, string Url)
        {
            return new Combo
            {
                Name = dto.Name,
                Description = dto.Description,
                imageUrl = Url,
                Price = dto.Price,
                IsActive = dto.IsActive

            };
        }
        public static GetComboDto ToGetCombo(this Combo combo)
        {
            return new GetComboDto
            {
                Name = combo.Name,
                Description = combo.Description,
                imageUrl = combo.imageUrl,
                Price = combo.Price,
                IsActive = combo.IsActive
            };
        }
    }
}