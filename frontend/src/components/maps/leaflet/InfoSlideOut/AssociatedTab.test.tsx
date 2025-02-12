import 'leaflet';
import 'leaflet/dist/leaflet.css';

import { render } from '@testing-library/react';
import { IParcel } from 'actions/parcelsActions';
import { Label } from 'components/common/Label';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AssociatedBuildingsList from './AssociatedBuildingsList';
import AssociatedParcelsList from './AssociatedParcelsList';
import { mockBuilding, mockParcel } from './InfoContent.test';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const addAssociatedBuildingLink = (
  <>
    <FaPlusSquare color="#1a5a96" className="mr-1" />
    <Label>Add a new Building</Label>
  </>
);

const AsscParcelsTab = (parcels: IParcel[]) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AssociatedParcelsList parcels={parcels} />
      </Router>
    </Provider>
  );
};

const AsscBuildingsTab = (propertyInfo: IParcel | null, canEditProperty: boolean) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AssociatedBuildingsList
          propertyInfo={propertyInfo}
          canEditDetails={canEditProperty}
          addAssociatedBuildingLink={addAssociatedBuildingLink}
        />
      </Router>
    </Provider>
  );
};

describe('Associated Buildings/Parcels view', () => {
  it('Associated buildings list renders correctly', () => {
    const { container } = render(AsscBuildingsTab(mockParcel, true));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Associated buildings list shows building name', () => {
    const { getByText } = render(AsscBuildingsTab(mockParcel, true));
    expect(getByText('test name')).toBeVisible();
  });

  it('Add associated building link does not appear if no permission', () => {
    const { queryByText } = render(AsscBuildingsTab(mockParcel, false));
    expect(queryByText('Add a new Building')).toBeNull();
  });

  it('Associated parcels list renders correctly', () => {
    const { container } = render(AsscParcelsTab(mockBuilding.parcels));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Associated parcels list shows parcel PID', () => {
    const { getByText } = render(AsscParcelsTab(mockBuilding.parcels));
    expect(getByText('000-000-000')).toBeVisible();
  });
});
