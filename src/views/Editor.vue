<template>
  <div class="editor editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <!-- <h2 class="text-xs-center">
            <span>{{pageHeader}}</span>&nbsp;Article
          </h2> -->
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
              <span v-if="showErrors">Title can't be blank, Min. 1 character required</span>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="description"
                />
              </fieldset>
              <span v-if="showErrors">Description can't be blank, Min. 1 character required</span>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <span v-if="showErrors">Body can't be blank, Min. 1 character required</span>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-success"
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
  private showErrors: boolean = false;
  private pageHeader: string = "";

  public submitArticle(): void {
    if (this.checkIfMandatoryFieldsPresent()) {
      if (this.$route.params.slug) {
        articles
          .modifyArticle({
            slug: this.$route.params.slug,
            art: {
              title: this.title,
              description: this.description,
              body: this.body
            }
          })
          .then(() => {
            this.$router.push("/articles/" + articles.article!.slug);
          });
      } else {
        articles
          .addArticle({
            title: this.title,
            description: this.description,
            body: this.body
          })
          .then(() => {
            this.$router.push("/articles/" + articles.article!.slug);
          });
      }
    } else {
      this.showErrors = true;
    }
  }

  private async created() {
    if (this.$route.params.slug) {
      await articles.getArticle(this.$route.params.slug).then(() => {
        this.title = articles.article!.title;
        this.description = articles.article!.description;
        this.body = articles.article!.body;
      });
      this.pageHeader = "Edit";
    } else {
      this.pageHeader = "Add New";
    }
  }

  private checkIfMandatoryFieldsPresent() {
    if (this.title && this.description && this.body) {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style scoped>
.editor {
  margin-top: 100px;
}
</style>