<template>
    <Page class="page">
        <ActionBar title="Your Book Shelf">
            <NavigationButton text="Go Back"
                              android.systemIcon="ic_menu_back"
                              @tap="$navigateBack">

            </NavigationButton>
        </ActionBar>
        <TextView text="Welcome to You Ebook Shelf"/>
    </Page>
</template>

<script>
    export default {
        name: "BookShelf"
    }
    </script>

<style scoped>

</style>
