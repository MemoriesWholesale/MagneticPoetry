"""empty message

Revision ID: 5e344240df20
Revises: 88b0e60f33a2
Create Date: 2023-06-27 17:26:46.534173

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e344240df20'
down_revision = '88b0e60f33a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poem', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=40), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('poem', schema=None) as batch_op:
        batch_op.drop_column('title')

    # ### end Alembic commands ###
