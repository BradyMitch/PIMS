using Mapster;
using Model = Pims.Api.Areas.Project.Models.Dispose;
using Entity = Pims.Dal.Entities;
using Pims.Api.Mapping.Converters;
using Pims.Api.Models;

namespace Pims.Api.Areas.Project.Mapping.Dispose
{
    public class ParcelMap : IRegister
    {

        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Entity.Parcel, Model.ParcelModel>()
                .IgnoreNonMapped(true)
                .EnableNonPublicMembers(true)
                .Map(dest => dest.Id, src => src.Id)
                .Map(dest => dest.PID, src => src.ParcelIdentity)
                .Map(dest => dest.PIN, src => src.PIN)
                .Map(dest => dest.ProjectNumber, src => src.ProjectNumber)
                .Map(dest => dest.StatusId, src => src.StatusId)
                .Map(dest => dest.Status, src => src.Status.Name)
                .Map(dest => dest.Description, src => src.Description)
                .Map(dest => dest.ClassificationId, src => src.ClassificationId)
                .Map(dest => dest.Classification, src => src.Classification.Name)
                .Map(dest => dest.AgencyId, src => src.AgencyId)
                .Map(dest => dest.Agency, src => src.Agency == null ? null : src.Agency.ParentId.HasValue ? src.Agency.Parent.Code : src.Agency.Code)
                .Map(dest => dest.SubAgency, src => src.Agency == null ? null : src.Agency.ParentId.HasValue ? src.Agency.Name : null)
                .Map(dest => dest.Latitude, src => src.Latitude)
                .Map(dest => dest.Longitude, src => src.Longitude)
                .Map(dest => dest.Address, src => src.Address)
                .Map(dest => dest.LandArea, src => src.LandArea)
                .Map(dest => dest.LandLegalDescription, src => src.LandLegalDescription)
                .Map(dest => dest.Municipality, src => src.Municipality)
                .Map(dest => dest.Zoning, src => src.Zoning)
                .Map(dest => dest.ZoningPotential, src => src.ZoningPotential)
                .Map(dest => dest.IsSensitive, src => src.IsSensitive)
                .Map(dest => dest.Buildings, src => src.Buildings)
                .Map(dest => dest.Evaluations, src => src.Evaluations)
                .Map(dest => dest.Fiscals, src => src.Fiscals)
                .Inherits<Entity.BaseEntity, BaseModel>();


            config.NewConfig<Model.ParcelModel, Entity.Parcel>()
                .IgnoreNonMapped(true)
                .EnableNonPublicMembers(true)
                .Map(dest => dest.Id, src => src.Id)
                .Map(dest => dest.PID, src => ParcelConverter.ConvertPID(src.PID))
                .Map(dest => dest.PIN, src => src.PIN)
                .Map(dest => dest.StatusId, src => src.StatusId)
                .Map(dest => dest.ClassificationId, src => src.ClassificationId)
                .Map(dest => dest.Description, src => src.Description)
                .Map(dest => dest.AgencyId, src => src.AgencyId)
                .Map(dest => dest.Latitude, src => src.Latitude)
                .Map(dest => dest.Longitude, src => src.Longitude)
                .Map(dest => dest.AddressId, src => src.Address == null ? 0 : src.Address.Id)
                .Map(dest => dest.Address, src => src.Address)
                .Map(dest => dest.LandArea, src => src.LandArea)
                .Map(dest => dest.LandLegalDescription, src => src.LandLegalDescription)
                .Map(dest => dest.Municipality, src => src.Municipality)
                .Map(dest => dest.Zoning, src => src.Zoning)
                .Map(dest => dest.ZoningPotential, src => src.ZoningPotential)
                .Map(dest => dest.IsSensitive, src => src.IsSensitive)
                .Map(dest => dest.Buildings, src => src.Buildings)
                .Map(dest => dest.Evaluations, src => src.Evaluations)
                .Map(dest => dest.Fiscals, src => src.Fiscals)
                .Inherits<BaseModel, Entity.BaseEntity>();
        }
    }
}