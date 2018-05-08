/* Greenbone Security Assistant
 *
 * Authors:
 * Steffen Waterkamp <steffen.watekamp@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import _ from 'gmp/locale';

import PropTypes from 'web/utils/proptypes';
import Theme from 'web/utils/theme';


import DataTableDisplay from 'web/components/dashboard2/display/datatabledisplay'; // eslint-disable-line max-len
import transformCreated from 'web/components/dashboard2/display/created/createdtransform'; // eslint-disable-line max-len
import CreatedDisplay from 'web/components/dashboard2/display/created/createddisplay'; // eslint-disable-line max-len
import {registerDisplay} from 'web/components/dashboard2/registry';

import {OvaldefCreatedLoader} from './loaders';

export const OvaldefsCreatedDisplay = ({
  filter,
  ...props
}) => (
  <OvaldefCreatedLoader
    filter={filter}
  >
    {loaderProps => (
      <CreatedDisplay
        {...props}
        {...loaderProps}
        filter={filter}
        title={({data: tdata}) =>
          _('OVAL Definitions by Creation Time')}
        yAxisLabel={_('# of created OVAL Definitions')}
        y2AxisLabel={_('Total OVAL Definitions')}
        xAxisLabel={_('Time')}
        yLine={{
          color: Theme.darkGreen,
          label: _('Created OVAL Defs'),
        }}
        y2Line={{
          color: Theme.darkGreen,
          dashArray: '3, 2',
          label: _('Total OVAL Defs'),
        }}
      />
    )}
  </OvaldefCreatedLoader>
);

OvaldefsCreatedDisplay.propTypes = {
  filter: PropTypes.filter,
};

OvaldefsCreatedDisplay.displayId = 'ovaldef-by-created';

export const OvaldefsCreatedTableDisplay = ({
  filter,
  ...props
}) => (
  <OvaldefCreatedLoader
    filter={filter}
  >
    {loaderProps => (
      <DataTableDisplay
        {...props}
        {...loaderProps}
        dataTitles={[
          _('Creation Time'),
          _('# of OVAL Definitions'),
          _('Total OVAL Definitions'),
        ]}
        dataRow={({row}) => [row.label, row.y, row.y2]}
        dataTransform={transformCreated}
        title={() => _('OVAL Definitions by Creation Time')}
      />
    )}
  </OvaldefCreatedLoader>
);

OvaldefsCreatedTableDisplay.propTypes = {
  filter: PropTypes.filter,
};

OvaldefsCreatedTableDisplay.displayId = 'ovaldef-by-created-table';

registerDisplay(OvaldefsCreatedTableDisplay.displayId,
  OvaldefsCreatedTableDisplay, {
    title: _('Table: OVAL Definitions by Creation Time'),
  });

registerDisplay(OvaldefsCreatedDisplay.displayId,
  OvaldefsCreatedDisplay, {
    title: _('Chart: OVAL Definitions by Creation Time'),
  });

// vim: set ts=2 sw=2 tw=80: