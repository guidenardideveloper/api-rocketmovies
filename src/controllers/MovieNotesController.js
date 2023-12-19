const knex = require("../database/knex");

class MovieNotesController {
    async create(request, response) {
        const {title, description, rating, tags} = request.body;
        const user_id = request.user.id;

        const [movie_id] = await knex("movieNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => {
            return {
                movie_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();
    };


    async show(request, response) {
        const {id} = request.params;

        const movie = await knex("movieNotes").where({id}).first();
        const tags = await knex("tags").where({movie_id: id}).orderBy("name");

        return response.json({
            ...movie,
            tags
        });
    };


    async delete(request, response) {
        const {id} = request.params;

        await knex("movieNotes").where({id}).delete();

        return response.json();
    };


    async index(request, response) {
        const {title, tags} = request.query;
        const user_id = request.user.id;

        let movieNotes;

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            movieNotes = await knex("tags")
            .select([
                "movieNotes.id",
                "movieNotes.title",
                "movieNotes.user_id",
            ])
            .where("movieNotes.user_id", user_id)
            .whereLike("movieNotes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("movieNotes", "movieNotes.id", "tags.movie_id")
            .orderBy("movieNotes.title")
        } else {
            movieNotes = await knex("movieNotes")
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("tags").where({user_id});
        const moviesWithTags = movieNotes.map(movieNote => {
            const movieTags = userTags.filter(tag => tag.movie_id === movieNote.id);

            return {
                ...movieNote,
                tags: movieTags
            }
        });

        return response.json(moviesWithTags);
    };
};

module.exports = MovieNotesController;