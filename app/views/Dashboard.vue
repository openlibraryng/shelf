<template>
    <Page class="page">
        <ActionBar class="action-bar" title="My Books">

            <ActionItem @tap="onSearchTap"
                        ios.systemIcon="12" ios.position="left"
                        android.systemIcon="ic_menu_search"
                        android.position="actionBar">

            </ActionItem>

            <ActionItem text="E-Book"
                        @tap="$navigateTo(bookShelfPage)">
            </ActionItem>
        </ActionBar>

        <GridLayout rows="*,*, 2*">
            <StackLayout row="0">
                <TextView text="Pending Books"/>
                <Label :text="fullName"/>
            </StackLayout>

            <StackLayout row="1">
                <TextView text="Watchlist"/>
            </StackLayout>

            <StackLayout row="2">
                <TextView text="Browse Books"/>
            </StackLayout>

        </GridLayout>


    </Page>
</template>

<script>
    import user from '../data/user.json'
    import books from '../data/books.json'

    import BookShelf from '../views/BookShelf'

    export default {
        name: "Dashboard",
        data() {
            return {
                bookShelfPage: BookShelf,
                user: user["-LM_Ym2i79sv-7_a265G"],
                books: books
                // books: booksData
            }
        },
        methods: {
            onSearchTap() {
                console.log(this.user["-LM_Ym2i79sv-7_a265G"].firstName)
            },
        },
        computed: {
            fullName() {
                return this.user.firstName + ' ' + this.user.lastName
            }
        }
    }
</script>

<style scoped>

</style>
