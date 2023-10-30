const knex = require("../database/knex");

class MovieNotesController {
    async create(request, response) {
        const {title, description, rating, tags} = request.body;
        const {user_id} = request.params;

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
};

module.exports = MovieNotesController;