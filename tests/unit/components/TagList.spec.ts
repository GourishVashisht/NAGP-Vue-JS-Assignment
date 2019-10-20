import { shallowMount, Wrapper } from "@vue/test-utils";
import TagList from "@/components/common/TagList.vue";

describe("TagList ", () => {

  const tagList = ["Tag1", "Tag2", "Tag3"];
  let wrapper: Wrapper<TagList>;

  function getTagListWrapper() {
    return shallowMount(TagList, {
      propsData: {
        tags: tagList
      }
    });
  }

  beforeEach(() => {
    wrapper = getTagListWrapper();
  });

  it("should be created", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should display tags provided as props from parent component", () => {
    expect(wrapper.props().tags).toEqual(tagList);
    expect(wrapper.findAll("li").length).toEqual(3);
    expect(wrapper.findAll("li").at(0).text()).toEqual("Tag1");
    expect(wrapper.findAll("li").at(1).text()).toEqual("Tag2");
    expect(wrapper.findAll("li").at(2).text()).toEqual("Tag3");
  });

  it("should display changed tags when props data is changed from parent component", () => {
    wrapper.setProps({
      tags: ["Tag1"]
    });
    expect(wrapper.text()).toEqual("Tag1");
    expect((wrapper.findAll("li").length)).toEqual(1);
    expect(wrapper.find("li").text()).toEqual("Tag1");
  });

});
