import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/Home.vue"),
        children: [
            {
                name: "home",
                path: "/",
                component: () => import("@/views/GlobalFeed.vue")
            },
            {
                name: "home-my-feed",
                path: "/my-feed",
                component: () => import("@/views/MyFeed.vue")
            }
        ]
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/Login.vue")
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@/views/Register.vue")
    }
];

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter({ routes });

const store = new Vuex.Store({});

describe("Login Component ", () => {

    let wrapper: Wrapper<Login>;

    const mockMethods = {
        loginUser: jest.fn()
    };

    function getLoginWrapper() {
        return shallowMount(Login, {
            data: () => {
                return {
                    email: "",
                    password: "",
                    genericError: "",
                    user: {
                        email: "",
                        password: ""
                    },
                    errors: {
                        email: "",
                        password: ""
                    }
                };
            },
            localVue,
            router,
            store,
            // methods: mockMethods
            // if i want to check mock method invocation thn i will uncomment it
        });
    }

    beforeEach(() => {
        wrapper = getLoginWrapper();
        router.push("/login");
    });

    it("should be created", () => {
        expect(wrapper).toBeTruthy();
    });

    describe("should render html elements on page opening", () => {

        it("should display login header for the login form", () => {
            expect(wrapper.find("h1").isVisible()).toBeTruthy();
            expect(wrapper.find("h1").text()).toEqual("Sign In");
        });

        it("should display router link to go to register page", () => {
            expect(wrapper.find("p").isVisible()).toBeTruthy();
            expect(wrapper.find("p").text()).toEqual("Need an account?");
        });

        it("should display empty login form when page opens", () => {
            // expect(wrapper.find('fieldset input[type="text"]').element.value)).toEqual("");
            expect(wrapper.findAll("input").at(1).text()).toEqual("");
        });

        it("should display sign in button", () => {
            expect(wrapper.find("button").isVisible()).toBeTruthy();
            expect(wrapper.find("button").text()).toEqual("Sign in");
        });

    });

    describe("testing methods of login component", () => {

        it("should display correct route name in browser url", () => {
            expect(wrapper.vm.$route.name).toEqual("login");
            expect(wrapper.vm.$route.path).toEqual("/login");
            expect(wrapper.vm.$route.params).toEqual({});
            expect(wrapper.vm.$route.query).toEqual({});
        });

        it("should display correct error messages when both email id and password are empty", () => {
            wrapper.setData({
                email: "",
                password: "",
                errors: {
                    email: "Email is invalid",
                    password: "Password is invalid"
                }
            });
            expect(wrapper.find("#email-error").isVisible()).toEqual(true);
            expect(wrapper.find("#email-error").text()).toEqual("Email is invalid");
            expect(wrapper.find("#password-error").isVisible()).toEqual(true);
            expect(wrapper.find("#password-error").text()).toEqual("Password is invalid");
            expect(wrapper.find("#generic-error").text()).toEqual("");
        });

        it("should display correct error message when email id is empty", () => {
            wrapper.setData({
                email: "",
                password: "password_123",
                errors: {
                    email: "Email is invalid",
                    password: ""
                }
            });
            expect(wrapper.find("#email-error").isVisible()).toEqual(true);
            expect(wrapper.find("#email-error").text()).toEqual("Email is invalid");
            expect(wrapper.find("#password-error").isVisible()).toEqual(true);
            expect(wrapper.find("#password-error").text()).toEqual("");
            expect(wrapper.find("#generic-error").text()).toEqual("");
        });

        it("should display correct error message when password is empty", () => {
            wrapper.setData({
                email: "emailid@gmail.com",
                password: "",
                errors: {
                    email: "",
                    password: "Password is invalid"
                }
            });
            expect(wrapper.find("#email-error").isVisible()).toEqual(true);
            expect(wrapper.find("#email-error").text()).toEqual("");
            expect(wrapper.find("#password-error").isVisible()).toEqual(true);
            expect(wrapper.find("#password-error").text()).toEqual("Password is invalid");
            expect(wrapper.find("#generic-error").text()).toEqual("");
        });

        it("should display correct error message when comination of email id and password is invalid",
            () => {
                wrapper.setData({
                    email: "emailid@gmail.com",
                    password: "password_123",
                    genericError: "Either email or password is invalid"
                });
                expect(wrapper.find("#email-error").isVisible()).toEqual(true);
                expect(wrapper.find("#email-error").text()).toEqual("");
                expect(wrapper.find("#password-error").isVisible()).toEqual(true);
                expect(wrapper.find("#password-error").text()).toEqual("");
                expect(wrapper.find("#generic-error").isVisible()).toEqual(true);
                expect(wrapper.find("#generic-error").text()).toEqual("Either email or password is invalid");
            });

        it("should login user with the entered fields, and route to home page", () => {
            wrapper.setData({
                email: "",
                password: ""
            });
            wrapper.find("input[type='text']").setValue("emailid@gmail.com");
            wrapper.find("input[type='password']").setValue("password_123");
            expect(wrapper.find("#email-error").isVisible()).toEqual(true);
            expect(wrapper.find("#email-error").text()).toEqual("");
            expect(wrapper.find("#password-error").isVisible()).toEqual(true);
            expect(wrapper.find("#password-error").text()).toEqual("");
            expect(wrapper.find("#generic-error").text()).toEqual("");
            expect(wrapper.vm.$data.email).toEqual("emailid@gmail.com");
            expect(wrapper.vm.$data.password).toEqual("password_123");

            // triggering click event n sign in button
            wrapper.find("button").trigger("submit.prevent");
            expect(wrapper.vm.$data.user.email).toEqual("emailid@gmail.com");
            expect(wrapper.vm.$data.user.password).toEqual("password_123");
        });

    });

});
