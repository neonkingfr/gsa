/* Copyright (C) 2017-2020 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
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

import {isDefined} from 'gmp/utils/identity';

import IconDivider from 'web/components/layout/icondivider';

import ExportIcon from 'web/components/icon/exporticon';

import withEntitiesActions from 'web/entities/withEntitiesActions';

import CloneIcon from 'web/entity/icon/cloneicon';
import EditIcon from 'web/entity/icon/editicon';
import TrashIcon from 'web/entity/icon/trashicon';

import ImportReportIcon from 'web/pages/tasks/icons/importreporticon';
import ResumeIcon from 'web/pages/tasks/icons/resumeicon';
import ScheduleIcon from 'web/pages/tasks/icons/scheduleicon';
import StartIcon from 'web/pages/tasks/icons/starticon';
import StopIcon from 'web/pages/tasks/icons/stopicon';

import PropTypes from 'web/utils/proptypes';

import {useCloneTask, useDeleteTask} from './graphql';

const Actions = ({
  entity,
  links,
  refetch,
  onReportImportClick,
  onTaskDownloadClick,
  onTaskEditClick,
  onTaskResumeClick,
  onTaskStartClick,
  onTaskStopClick,
}) => {
  const deleteTask = useDeleteTask();
  const cloneTask = useCloneTask();
  return (
    <IconDivider align={['center', 'center']} grow>
      {isDefined(entity.schedule) ? (
        <ScheduleIcon schedule={entity.schedule} links={links} />
      ) : (
        <StartIcon task={entity} onClick={onTaskStartClick} />
      )}

      <ImportReportIcon task={entity} onClick={onReportImportClick} />

      <StopIcon task={entity} onClick={onTaskStopClick} />

      <ResumeIcon task={entity} onClick={onTaskResumeClick} />

      <TrashIcon
        entity={entity}
        name="task"
        onClick={() => deleteTask({taskId: entity.id}).then(refetch)}
      />
      <EditIcon entity={entity} name="task" onClick={onTaskEditClick} />
      <CloneIcon
        entity={entity}
        name="task"
        onClick={() => cloneTask({taskId: entity.id}).then(refetch)}
      />
      <ExportIcon
        value={entity}
        title={_('Export Task')}
        onClick={onTaskDownloadClick}
      />
    </IconDivider>
  );
};
Actions.propTypes = {
  entity: PropTypes.model.isRequired,
  links: PropTypes.bool,
  refetch: PropTypes.func,
  onReportImportClick: PropTypes.func.isRequired,
  onTaskCloneClick: PropTypes.func,
  onTaskDeleteClick: PropTypes.func,
  onTaskDownloadClick: PropTypes.func.isRequired,
  onTaskEditClick: PropTypes.func.isRequired,
  onTaskResumeClick: PropTypes.func.isRequired,
  onTaskStartClick: PropTypes.func.isRequired,
  onTaskStopClick: PropTypes.func.isRequired,
};

export default withEntitiesActions(Actions);

// vim: set ts=2 sw=2 tw=80:
