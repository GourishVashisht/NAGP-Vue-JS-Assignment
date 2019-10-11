<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="submitArticle()"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import articles from "@/store/modules/ArticleModule";
import { Article } from "@/models/Article";

@Component
export default class Editor extends Vue {
  private title: string = "";
  private description: string = "";
  private body: string = "";

  public submitArticle(): void {
    articles.addArticle({
      title: this.title,
      descrption: this.description,
      body: this.body
    });
  }
}
</script>