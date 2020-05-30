import Vue from 'nativescript-vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import * as ApplicationSettings from "tns-core-modules/application-settings";
import VueDevtools from 'nativescript-vue-devtools'
import VueApollo from "vue-apollo";
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink
} from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
/////////////// APOLLO
Vue.use(VueApollo);
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});
const httpLink = new HttpLink({
    uri: "https://polar-badlands-01357.herokuapp.com/graphql"
});
const authLink = setContext((_, { headers }) => {
    // get the authentication token from ApplicationSettings if it exists
    var tokenInAppSettings = ApplicationSettings.getString("token");
    // return the headers to the context so HTTP link can read them
    return {
        headers: {
            ...headers,
            authorization: tokenInAppSettings
                ? `Bearer ${tokenInAppSettings}`
                : null
        }
    };
});
export const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});


if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  apolloProvider,
  render: h => h("frame", [h(ApplicationSettings.hasKey("token")? App : Login)])
}).$start()
