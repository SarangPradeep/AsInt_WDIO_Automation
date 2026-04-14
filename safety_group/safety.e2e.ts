import safetyHAZOPDetailView from '../page_object_model/btp_applications_page/safety_group/hazop.detail.page';
import safetyHAZOPListView from '../page_object_model/btp_applications_page/safety_group/hazop.listview.page';

describe("Navigate To Hazop", () => {

  it('should navigate to HAZOP Tile', async () => {
    await safetyHAZOPListView.navigateToHazopTile();
    await safetyHAZOPListView.createHazopstudy();
    await safetyHAZOPDetailView.detailViewPages();
          
      });


    });

