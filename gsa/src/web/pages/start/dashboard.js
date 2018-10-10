/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
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

import PropTypes from 'web/utils/proptypes';

import {canAddDisplay} from 'web/store/dashboard/settings/utils';

import {Dashboard} from 'web/components/dashboard/dashboard';
import {DashboardControls} from 'web/components/dashboard/controls';

import Layout from 'web/components/layout/layout';

import {TASKS_DISPLAYS} from '../tasks/dashboard';
import {REPORTS_DISPLAYS} from '../reports/dashboard';
import {RESULTS_DISPLAYS} from '../results/dashboard';
import {NOTES_DISPLAYS} from '../notes/dashboard';
import {OVERRIDES_DISPLAYS} from '../overrides/dashboard';
import {VULNS_DISPLAYS} from '../vulns/dashboard';
import {HOSTS_DISPLAYS} from '../hosts/dashboard';
import {OS_DISPLAYS} from '../operatingsystems/dashboard';
import {NVTS_DISPLAYS} from '../nvts/dashboard';
import {OVALDEF_DISPLAYS} from '../ovaldefs/dashboard';
import {CERTBUND_DISPLAYS} from '../certbund/dashboard';
import {CVES_DISPLAYS} from '../cves/dashboard';
import {CPES_DISPLAYS} from '../cpes/dashboard';
import {DFNCERT_DISPLAYS} from '../dfncert/dashboard';
import {SECINFO_DISPLAYS} from '../secinfo/dashboard';

import {DEFAULT_DISPLAYS} from './newdashboarddialog';

const ALL_DISPLAYS = [
  ...TASKS_DISPLAYS,
  ...REPORTS_DISPLAYS,
  ...RESULTS_DISPLAYS,
  ...NOTES_DISPLAYS,
  ...OVERRIDES_DISPLAYS,
  ...VULNS_DISPLAYS,
  ...HOSTS_DISPLAYS,
  ...OS_DISPLAYS,
  ...NVTS_DISPLAYS,
  ...OVALDEF_DISPLAYS,
  ...CERTBUND_DISPLAYS,
  ...CVES_DISPLAYS,
  ...CPES_DISPLAYS,
  ...DFNCERT_DISPLAYS,
  ...SECINFO_DISPLAYS,
];

const StartDashboard = ({
  id,
  loadSettings,
  saveSettings,
  onInteraction,
  onNewDisplay,
  onResetDashboard,
  ...props
}) => (
  <Layout flex="column" grow>
    <Layout align="end">
      <DashboardControls
        canAdd={canAddDisplay(props)}
        dashboardId={id}
        displayIds={ALL_DISPLAYS}
        onInteraction={onInteraction}
        onNewDisplay={onNewDisplay}
        onResetClick={onResetDashboard}
      />
    </Layout>
    <Dashboard
      {...props}
      id={id}
      showFilterSelection
      showFilterString
      defaultDisplays={DEFAULT_DISPLAYS}
      permittedDisplays={ALL_DISPLAYS}
      loadSettings={loadSettings}
      saveSettings={saveSettings}
      onInteraction={onInteraction}
    />
  </Layout>
);

StartDashboard.propTypes = {
  id: PropTypes.id.isRequired,
  loadSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onNewDisplay: PropTypes.func.isRequired,
  onResetDashboard: PropTypes.func.isRequired,
};

export default StartDashboard;

// vim: set ts=2 sw=2 tw=80: