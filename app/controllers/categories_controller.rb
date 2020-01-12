class CategoriesController < ApplicationController
  # TODO: Condense HTTP Digest authentication into one controller that will be inherited by ItemsController and CategoriesController
  USERS = { "john" => "1234" }

  before_action :authenticate, except: [:index, :show]
  
  def index
    @categories = Category.all
  end

  def show
  end

  def new
    @category = Category.new
  end

  def edit
    @category = Category.find(params[:id])
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      redirect_to categories_path
    else
      render 'new'
    end
  end

  def update
    @category = Category.find(params[:id])

    if @category.update(category_params)
      redirect_to categories_path
    else
      render 'edit'
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    redirect_to categories_path
  end

  private

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end
  
  def category_params
    params.require(:category).permit(:title, :description)
  end
end
