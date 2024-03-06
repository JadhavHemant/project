import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StudentCommon from '../StudentIdeation/StudentCommon/StudentCommon';
import StudentForm from '../StudentIdeation/StudentForm/StudentForm';
import StudentIdeation from '../StudentIdeation/StudentIdeation/StudentIdeation';
import Table from '../StudentIdeation/Table/Table';
import EditSDetails from '../StudentIdeation/EditSDetails/EditSDetails';
import View from '../StudentIdeation/View/View';

import ReserchComm from '../../Research/ReserchComm/ReserchComm';
import TableRes from '../../Research/ResearchDetails/TableRes/TableRes';
import AddResearch from '../../Research/ResearchDetails/AddResearch/AddResearch';
import ResView from '../../Research/ResearchDetails/ResView/ResView';
import EditRes from '../../Research/ResearchDetails/EditRes/EditRes';
import ResearchForm from '../../Research/ResearchDetails/ResearchForm/ResearchForm';
import AddReferance from '../StudentIdeation/AddReferance/AddReferance';
import ResearchRef from '../../Research/ResearchDetails/ResearchRef/ResearchRef';
import TableRef from '../../Research/ResearchDetails/ResearchRef/TableRef/TableRef';
import AddRef from '../../Research/ResearchDetails/ResearchRef/AddRef/AddRef';
import EditRef from '../../Research/ResearchDetails/ResearchRef/EditRef/EditRef';
import ViewRef from '../../Research/ResearchDetails/ResearchRef/ViewRef/ViewRef';
import TableRefs from '../StudentIdeation/AddReferance/TableRef/TableRef';
import EditRefs from '../StudentIdeation/AddReferance/EditRef/EditRef';
import ViewRefs from '../StudentIdeation/AddReferance/ViewRef/ViewRef';
import AddRefs from '../StudentIdeation/AddReferance/AddRef/AddRef';
import EcosComm from '../StudentIdeation/Ecosystem/EcosComm/EcosComm';
import EcosystemAdd from '../StudentIdeation/Ecosystem/EcosystemAdd/EcosystemAdd';
import EcosystemTable from '../StudentIdeation/Ecosystem/EcosystemTable/EcosystemTable';
import EcosystemEdit from '../StudentIdeation/Ecosystem/EcosystemEdit/EcosystemEdit';
import EcosystemView from '../StudentIdeation/Ecosystem/EcosystemView/EcosystemView';

const MainComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="student" element={<StudentCommon />}>
          <Route path="" element={<StudentForm />} />
          <Route path="refe" element={<AddReferance />} />
          <Route path="tablestudent" element={<Table />} />
          <Route path="studentidea" element={<StudentIdeation />} />
          <Route path="studentedit" element={<EditSDetails />} />
          <Route path="studentview" element={<View />} />
          <Route path="stableref" element={<TableRefs />} />
          <Route path="seditref" element={<EditRefs />} />
          <Route path="sviewref" element={<ViewRefs />} />
          <Route path="addrefs" element={<AddRefs />} />
        </Route>
        <Route path="resarch" element={<ReserchComm />}>
          <Route path="" element={<ResearchForm />} />
          <Route path="reference" element={<ResearchRef />} />
          <Route path="researchtable" element={<TableRes />} />
          <Route path="researchadd" element={<AddResearch />} />
          <Route path="researchview" element={<ResView />} />
          <Route path="researchedit" element={<EditRes />} />
          <Route path="reftable" element={<TableRef />} />
          <Route path="addref" element={<AddRef />} />
          <Route path="refedit" element={<EditRef />} />
          <Route path="refview" element={<ViewRef />} />
        </Route>
        <Route path="ecosystem" element={<EcosComm />}>
          <Route path="" element={<EcosystemTable />} />
          <Route path="add" element={<EcosystemAdd />} />
          <Route path="edit" element={<EcosystemEdit />} />
          <Route path="view" element={<EcosystemView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainComponent;
