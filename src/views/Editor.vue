<template>
  <div class="editor editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h2 class="text-xs-center">
            <span>{{pageHeader}}</span>&nbsp;Article
          </h2>
          <form>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Article Title"
                v-model="title"
                @keydown="removeErrorMessage(0)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.title}}</div>

            <fieldset class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="What's this article about?"
                v-model="description"
                @keydown="removeErrorMessage(1)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.description}}</div>

            <fieldset class="form-group">
              <textarea
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                v-model="body"
                @keydown="removeErrorMessage(2)"
              ></textarea>
            </fieldset>
            <div class="error-text error-messages">{{errors.body}}</div>

            <fieldset class="form-group">
              <input type="text" class="form-control" placeholder="Enter tags" />
              <div class="tag-list"></div>
            </fieldset>
            <button
              class="btn btn-lg pull-xs-right btn-success publish-button"
              type="button"
              @click="submitArticle()"
            >Publish Article</button>
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
import { ArticleFormErrors } from "@/models/Errors";

@Component
export default class Editor extends Vue {
  private title: string = "";
  private description: string = "";
  private body: string = "";
  private showErrors: boolean = false;
  private pageHeader: string = "";
  private errors: ArticleFormErrors = {
    title: "",
    body: "",
    description: ""
  };

  public submitArticle(): void {
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
        })
        .catch((error) => {
          this.validateFormInputParameters(error.response.data.errors);
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
        })
        .catch((error) => {
          this.validateFormInputParameters(error.response.data.errors);
        });
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

  private validateFormInputParameters(errors: any) {
    if (errors.title) {
      this.errors.title = "Title " + errors.title.join(" & ");
    }
    if (errors.body) {
      this.errors.body = "Body " + errors.body.join(" & ");
    }
    if (errors.description) {
      this.errors.description = "Description " + errors.description.join(" & ");
    }
  }

  private removeErrorMessage(fieldNumber: number): void {
    if (this.errors) {
      switch (fieldNumber) {
        case 0:
          this.errors!.title = "";
          break;
        case 1:
          this.errors!.description = "";
          break;
        case 2:
          this.errors!.body = "";
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>
.editor {
  margin-top: 60px;
}

.publish-button{
  margin-top: 24px;
}
</style>