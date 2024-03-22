import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthComm from '../MemberLogin/Auth/AuthComm/AuthComm';
import Login from '../MemberLogin/Auth/Login/Login';
import Registerm from '../MemberLogin/Auth/Register/Register';
import UserCommon from '../MemberLogin/Infotect/User/UserCommon/UserCommon';

import AdminCommon from '../MemberLogin/AdminCommon/AdminCommon';
import MemberTable from '../MemberLogin/AdminPanel/MemberTable/MemberTable';
import MemberView from '../MemberLogin/AdminPanel/MemberTable/MemberView/MemberView';
import MemberAdd from '../MemberLogin/AdminPanel/MemberTable/MemberAdd/MemberAdd';
import MembershipTable from '../MemberLogin/AdminPanel/Membership/MembershipTable';
import MembershpiView from '../MemberLogin/AdminPanel/Membership/MembershpiView/MembershpiView';
import MemberShipAdd from '../MemberLogin/AdminPanel/Membership/MemberShipAdd/MemberShipAdd';
import MemberUpdate from '../MemberLogin/AdminPanel/MemberTable/MemberUpdate/MemberUpdate';
import MemberShipUpdate from '../MemberLogin/AdminPanel/Membership/MemberShipUpdate/MemberShipUpdate';
import OpportunitiesTable from '../MemberLogin/AdminPanel/Opportunities/OpportunitiesTable';
import OpportunitiesView from '../MemberLogin/AdminPanel/Opportunities/OpportunitiesView/OpportunitiesView';
import OpportunitiesUpdate from '../MemberLogin/AdminPanel/Opportunities/OpportunitiesUpdate/OpportunitiesUpdate';
import OpportunitiesAdd from '../MemberLogin/AdminPanel/Opportunities/OpportunitiesAdd/OpportunitiesAdd';
import AllocationOppoTable from '../MemberLogin/AdminPanel/AllocationOppo/AllocationOppoTable';
import AllocationAdd from '../MemberLogin/AdminPanel/AllocationOppo/AllocationAdd/AllocationAdd';
import AllocationView from '../MemberLogin/AdminPanel/AllocationOppo/AllocationView/AllocationView';
import AllocationUpdate from '../MemberLogin/AdminPanel/AllocationOppo/AllocationUpdate/AllocationUpdate';
import InterviewTable from '../MemberLogin/AdminPanel/Interview/InterviewTable';
import InterviewAdd from '../MemberLogin/AdminPanel/Interview/InterviewAdd/InterviewAdd';
import InterviewEdit from '../MemberLogin/AdminPanel/Interview/InterviewEdit/InterviewEdit';
import AboutPage from '../MemberLogin/Infotect/User/AboutPage/AboutPage';
import StudentIdeation from '../MemberLogin/AdminPanel/StudentIdeation/StudentIdeation/StudentIdeation';
import StudentAdminTabale from '../MemberLogin/AdminPanel/StudentIdeation/StudentAdminTabale/StudentAdminTabale';
import UpdateStudent from '../MemberLogin/AdminPanel/StudentIdeation/UpdateStudent/UpdateStudent';
import StudentView from '../MemberLogin/AdminPanel/StudentIdeation/StudentView/StudentView';
import StudentRefrence from '../MemberLogin/AdminPanel/StudentIdeation/StudentRefrence/StudentRefrence';
import RefrenceTable from '../MemberLogin/AdminPanel/StudentIdeation/RefrenceTable/RefrenceTable';
import RefrenceView from '../MemberLogin/AdminPanel/StudentIdeation/RefrenceView/RefrenceView';
import EditRefrence from '../MemberLogin/AdminPanel/StudentIdeation/EditRefrence/EditRefrence';
import ResarchTable from '../MemberLogin/AdminPanel/StudentIdeation/ResarchTable/ResarchTable';
import AddResarch from '../MemberLogin/AdminPanel/StudentIdeation/AddResarch/AddResarch';
import ResarchView from '../MemberLogin/AdminPanel/StudentIdeation/ResarchView/ResarchView';
import ResearchUpdate from '../MemberLogin/AdminPanel/StudentIdeation/ResearchUpdate/ResearchUpdate';
import AddResearchRef from '../MemberLogin/AdminPanel/StudentIdeation/AddResearchRef/AddResearchRef';
import ResearchRefTable from '../MemberLogin/AdminPanel/StudentIdeation/ResearchRefTable/ResearchRefTable';
import ResearchRefView from '../MemberLogin/AdminPanel/StudentIdeation/ResearchRefView/ResearchRefView';
import ResearchEdit from '../MemberLogin/AdminPanel/StudentIdeation/ResearchEdit/ResearchEdit';
import Ideation from '../MemberLogin/Infotect/User/Ideation/Ideation';
import IdeationRef from '../MemberLogin/Infotect/User/Ideation/IdeationRef';
import Research from '../MemberLogin/Infotect/User/Research/Research';
import ResearchRef from '../MemberLogin/Infotect/User/Research/ResearchRef';
import Opportunity from '../MemberLogin/Infotect/User/Opportunity/Opportunity';
import IntrestOppor from '../MemberLogin/AdminPanel/Interest/IntrestOppor';
import CreateOpportunity from '../MemberLogin/Infotect/User/Opportunity/CreateOpportunity';
import EolDataView from '../MemberLogin/Infotect/User/EolDataView/EolDataView';
import SelectionStatus from '../MemberLogin/Infotect/User/EolDataView/SelectionStatus';
import Applyed from '../MemberLogin/Infotect/User/Opportunity/Applyed/Applyed';
import Reference from '../MemberLogin/Infotect/User/Reference/Reference';
import Resourcemaster from '../MemberLogin/AdminPanel/Resourcemaster/Resourcemaster';
import Calulateper from '../MemberLogin/Infotect/User/Calulateper/Calulateper';
import Group from '../MemberLogin/Infotect/User/Calulateper/Group';
import Greoupmember from '../MemberLogin/Infotect/User/Calulateper/Groupmember';
import AddGroup from '../MemberLogin/Infotect/User/Calulateper/AddGroup';
import MembercardView from '../MemberLogin/Infotect/User/MemberView/MembercardView';



const MainCommon = () => {
   return (
      <>
         <div>
            <Router>
               <Routes>
                  <Route path='user' element={<UserCommon />}>
                     <Route path='' element={<AboutPage />} />
                     <Route path='ideation' element={<Ideation />} />
                     <Route path='ideationref' element={<IdeationRef />} />
                     <Route path='research' element={<Research />} />
                     <Route path='researchref' element={<ResearchRef />} />
                     <Route path='oppo' element={<Opportunity />} />
                     <Route path='createoppo' element={<CreateOpportunity />} />
                     <Route path='viewint' element={<EolDataView />} />
                     <Route path='selectionStatus' element={<SelectionStatus />} />
                     <Route path='applyed' element={<Applyed />} />
                     <Route path='refrence' element={<Reference />} />
                     <Route path='calculate' element={<Calulateper />} />
                     <Route path='group' element={<Group />} />
                     <Route path='membergroup' element={<Greoupmember />} />

                     <Route path='addgroup' element={<AddGroup />} />
                     <Route path='memberviewscard' element={<MembercardView />} />
                  </Route>


                  <Route path='' element={<AuthComm />}>
                     <Route path='' element={<Login />} />
                     <Route path='register' element={< Registerm />} />
                  </Route>


                  <Route path="admin" element={<AdminCommon />}>
                     <Route path="" element={<MemberTable />} />
                     <Route path="membership" element={<MembershipTable />} />
                     <Route path="viewmember" element={<MemberView />} />
                     <Route path="addmember" element={<MemberAdd />} />
                     <Route path="updatemember" element={<MemberUpdate />} />
                     <Route path="viewmembership" element={<MembershpiView />} />
                     <Route path="addmembership" element={<MemberShipAdd />} />
                     <Route path="updatemembership" element={<MemberShipUpdate />} />
                     <Route path="oppo" element={<OpportunitiesTable />} />
                     <Route path="viewoppo" element={<OpportunitiesView />} />
                     <Route path="updateoppo" element={<OpportunitiesUpdate />} />
                     <Route path="addoppo" element={<OpportunitiesAdd />} />
                     <Route path="allo" element={<AllocationOppoTable />} />
                     <Route path="addallo" element={<AllocationAdd />} />
                     <Route path="viewallo" element={<AllocationView />} />
                     <Route path="updateallo" element={<AllocationUpdate />} />
                     <Route path="inter" element={<InterviewTable />} />
                     <Route path="addinter" element={<InterviewAdd />} />
                     <Route path="updateintern" element={<InterviewEdit />} />

                     <Route path="studenttable" element={<StudentAdminTabale />} />
                     <Route path="studentideation" element={<StudentIdeation />} />
                     <Route path="studentupdateinfo" element={<UpdateStudent />} />
                     <Route path="studentviewinfo" element={<StudentView />} />

                     <Route path="refrence" element={<StudentRefrence />} />
                     <Route path="refrencetable" element={<RefrenceTable />} />
                     <Route path="refrenceview" element={<RefrenceView />} />
                     <Route path="refrenceedit" element={< EditRefrence />} />

                     <Route path="resarchtable" element={<ResarchTable />} />
                     <Route path="addresearch" element={< AddResarch />} />
                     <Route path="researchviewinfo" element={<ResarchView />} />
                     <Route path="researchupdateinfo" element={<ResearchUpdate />} />
                     <Route path="refrenceaddresearch" element={< AddResearchRef />} />

                     <Route path="refrenceaddtableresearch" element={< ResearchRefTable />} />
                     <Route path="refrenceaddviewresearch" element={<ResearchRefView />} />
                     <Route path="refrenceaddupdateresarch" element={<ResearchEdit />} />

                     <Route path="intoppo" element={<IntrestOppor />} />
                     <Route path='resourcemaster' element={<Resourcemaster />} />

                    
                  </Route>
               </Routes>
            </Router>
         </div>
      </>
   )
}

export default MainCommon
