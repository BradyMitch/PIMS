using Xunit;
using System;
using System.Linq;
using System.Diagnostics.CodeAnalysis;
using System.Collections.Generic;
using Pims.Dal;
using Pims.Dal.Security;
using Pims.Dal.Entities.Models;
using Pims.Core.Test;
using Pims.Core.Comparers;
using Pims.Api.Areas.Project.Controllers;
using Pims.Api.Helpers.Exceptions;
using Moq;
using Model = Pims.Api.Areas.Project.Models.Dispose;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MapsterMapper;
using Entity = Pims.Dal.Entities;
using Pims.Dal.Helpers.Extensions;

namespace Pims.Api.Test.Controllers
{
    [Trait("category", "unit")]
    [Trait("category", "api")]
    [Trait("group", "project")]
    [ExcludeFromCodeCoverage]
    public class DisposeControllerTest
    {
        #region Data
        public static IEnumerable<object[]> ProjectFilters =>
            new List<object[]>
            {
                new object[] { new ProjectFilter() { Agencies = new int[] { 3 } } },
                new object[] { new ProjectFilter() { ProjectNumber = "ProjectNumber" } },
                new object[] { new ProjectFilter() { Name = "Name" } },
                new object[] { new ProjectFilter() { StatusId = 1 } },
                new object[] { new ProjectFilter() { TierLevelId = 2 } }
            };

        public static IEnumerable<object[]> ProjectQueries =>
            new List<object[]>
            {
                new object[] { new Uri("http://host/api/projects?Agencies=1,2") },
                new object[] { new Uri("http://host/api/projects?ProjectNumber=ProjectNumber") },
                new object[] { new Uri("http://host/api/projects?Name=Name") },
                new object[] { new Uri("http://host/api/projects?StatusId=1") },
                new object[] { new Uri("http://host/api/projects?TierLevelId=1") }
            };
        #endregion

        #region Constructors
        public DisposeControllerTest()
        {
        }
        #endregion

        #region Tests
        #region GetWorkflow
        [Fact]
        public void GetWorkflow_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyView);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var status = EntityHelper.CreateProjectStatuses();
            service.Setup(m => m.Project.GetWorkflow(It.IsAny<string>())).Returns(status);

            // Act
            var result = controller.GetWorkflow();

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            var actualResult = Assert.IsType<Model.ProjectStatusModel[]>(actionResult.Value);
            Assert.Null(actionResult.StatusCode);
            Assert.Equal(mapper.Map<Model.ProjectStatusModel[]>(status), actualResult, new DeepPropertyCompare());
            service.Verify(m => m.Project.GetWorkflow("SubmitDisposal"), Times.Once());
        }
        #endregion

        #region GetTasks
        [Fact]
        public void GetTasks_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyView);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var tasks = EntityHelper.CreateTasks();
            service.Setup(m => m.Task.Get(It.IsAny<Entity.TaskTypes>())).Returns(tasks);

            // Act
            var result = controller.GetTasks();

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            var actualResult = Assert.IsType<Model.TaskModel[]>(actionResult.Value);
            Assert.Null(actionResult.StatusCode);
            Assert.Equal(mapper.Map<Model.TaskModel[]>(tasks), actualResult, new DeepPropertyCompare());
            service.Verify(m => m.Task.Get(Entity.TaskTypes.DisposalProjectDocuments), Times.Once());
        }
        #endregion

        #region GetProject
        [Fact]
        public void GetProject_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyView);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var project = EntityHelper.CreateProject(1, 1);
            service.Setup(m => m.Project.Get(It.IsAny<string>())).Returns(project);

            // Act
            var result = controller.GetProject(project.ProjectNumber);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            var actualResult = Assert.IsType<Model.ProjectModel>(actionResult.Value);
            Assert.Null(actionResult.StatusCode);
            Assert.Equal(mapper.Map<Model.ProjectModel>(project), actualResult, new DeepPropertyCompare());
            service.Verify(m => m.Project.Get(project.ProjectNumber), Times.Once());
        }

        [Fact]
        public void GetProject_Model()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyView);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var project = EntityHelper.CreateProject(1, 1);
            project.ProjectNumber = "ProjectNumber";
            project.Name = "Municipality";
            project.Description = "Municipality";
            project.TierLevelId = 1;
            project.StatusId = 1;
            project.AgencyId = 1;

            var parcel = EntityHelper.CreateParcel(1, 1, 1, project.Agency);
            var building = EntityHelper.CreateBuilding(parcel, 1, project.ProjectNumber, "local", 1, 1, project.Agency);
            project.AddProperty(parcel).AddProperty(building);

            service.Setup(m => m.Project.Get(It.IsAny<string>())).Returns(project);

            // Act
            var result = controller.GetProject(project.ProjectNumber);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            Assert.Null(actionResult.StatusCode);
            var actualResult = Assert.IsType<Model.ProjectModel>(actionResult.Value);
            Assert.Equal(project.ProjectNumber, actualResult.ProjectNumber);
            Assert.Equal(project.Description, actualResult.Description);
            Assert.Equal(project.Name, actualResult.Name);
            Assert.Equal(project.StatusId, actualResult.StatusId);
            Assert.Equal(project.TierLevelId, actualResult.TierLevelId);
            Assert.Equal(project.AgencyId, actualResult.AgencyId);
            Assert.Equal(project.Properties.Count(), actualResult.Properties.Count());
        }
        #endregion

        #region AddProject
        [Fact]
        public void AddProject_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyAdd);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var project = EntityHelper.CreateProject(1);
            service.Setup(m => m.Project.Add(It.IsAny<Entity.Project>())).Returns(project);
            var model = mapper.Map<Model.ProjectModel>(project);

            // Act
            var result = controller.AddProject(model);

            // Assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(201, actionResult.StatusCode);
            var actualProject = Assert.IsType<Model.ProjectModel>(actionResult.Value);
            service.Verify(m => m.Project.Add(It.IsAny<Entity.Project>()), Times.Once());
        }
        #endregion

        #region UpdateProject
        [Fact]
        public void UpdateProject_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyEdit);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var project = EntityHelper.CreateProject(1);
            service.Setup(m => m.Project.Update(It.IsAny<Entity.Project>())).Returns(project);
            var model = mapper.Map<Model.ProjectModel>(project);

            // Act
            var result = controller.UpdateProject(project.ProjectNumber, model);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            Assert.Null(actionResult.StatusCode);
            var actualResult = Assert.IsType<Model.ProjectModel>(actionResult.Value);
            service.Verify(m => m.Project.Update(It.IsAny<Entity.Project>()), Times.Once());
        }
        #endregion

        #region DeleteProject
        [Fact]
        public void DeleteProject_Success()
        {
            // Arrange
            var helper = new TestHelper();
            var controller = helper.CreateController<DisposeController>(Permissions.PropertyDelete);

            var service = helper.GetService<Mock<IPimsService>>();
            var mapper = helper.GetService<IMapper>();
            var project = EntityHelper.CreateProject(1);
            service.Setup(m => m.Project.Remove(It.IsAny<Entity.Project>()));
            var modelToDelete = mapper.Map<Model.ProjectModel>(project);

            // Act
            var result = controller.DeleteProject(project.ProjectNumber, modelToDelete);

            // Assert
            var actionResult = Assert.IsType<JsonResult>(result);
            Assert.Null(actionResult.StatusCode);
            var actualResult = Assert.IsType<Model.ProjectModel>(actionResult.Value);
            Assert.Equal(mapper.Map<Model.ProjectModel>(project), actualResult, new DeepPropertyCompare());
            service.Verify(m => m.Project.Remove(It.IsAny<Entity.Project>()), Times.Once());
        }
        #endregion
        #endregion
    }
}